import { useState } from "react";
import { FileArchive, AlertCircle, CheckCircle, Loader } from "lucide-react";
import JSZip from "jszip";
import "./InstagramUpload.css";

interface InstagramData {
  username: string;
  followers: string[];
  following: string[];
  rawData?: {
    followers_1?: unknown;
    following?: unknown;
    profile?: unknown;
  };
}

interface InstagramUploadProps {
  onDataUpload: (data: InstagramData) => void;
}

function InstagramUpload({ onDataUpload }: InstagramUploadProps) {
  const [isDragOver, setIsDragOver] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);

  const parseInstagramFollowers = (jsonContent: string): string[] => {
    try {
      const data = JSON.parse(jsonContent);

      // Instagram data structure may vary
      // Common format: array of objects with "string_list_data"
      if (Array.isArray(data)) {
        return data
          .filter((item) => item.string_list_data && item.string_list_data[0])
          .map((item) => item.string_list_data[0].value)
          .filter(Boolean);
      }

      // Another possible format
      if (data.relationships_followers) {
        return data.relationships_followers
          .map(
            (item: { string_list_data?: Array<{ value: string }> }) =>
              item.string_list_data?.[0]?.value
          )
          .filter(Boolean);
      }

      return [];
    } catch (error) {
      console.error("Error processing followers:", error);
      return [];
    }
  };

  const parseInstagramFollowing = (jsonContent: string): string[] => {
    try {
      const data = JSON.parse(jsonContent);

      if (Array.isArray(data)) {
        return data
          .filter((item) => item.string_list_data && item.string_list_data[0])
          .map((item) => item.string_list_data[0].value)
          .filter(Boolean);
      }

      if (data.relationships_following) {
        return data.relationships_following
          .map(
            (item: { string_list_data?: Array<{ value: string }> }) =>
              item.string_list_data?.[0]?.value
          )
          .filter(Boolean);
      }

      return [];
    } catch (error) {
      console.error("Error processing following:", error);
      return [];
    }
  };

  const getUsername = (profileContent?: string): string => {
    if (!profileContent) return "usuario_instagram";

    try {
      const data = JSON.parse(profileContent);
      return (
        data.username ||
        data.profile_user?.[0]?.string_list_data?.[0]?.value ||
        "usuario_instagram"
      );
    } catch {
      return "usuario_instagram";
    }
  };

  const processInstagramZip = async (file: File): Promise<InstagramData> => {
    const zip = new JSZip();
    const zipContent = await zip.loadAsync(file);

    let followers: string[] = [];
    let following: string[] = [];
    let username = "usuario_instagram";
    const rawData: Record<string, unknown> = {};

    // Search for data files
    const possibleFollowerFiles = [
      "connections/followers_and_following/followers_1.json",
      "followers_and_following/followers.json",
      "followers.json",
    ];

    const possibleFollowingFiles = [
      "connections/followers_and_following/following.json",
      "followers_and_following/following.json",
      "following.json",
    ];

    const possibleProfileFiles = [
      "personal_information/personal_information.json",
      "profile/profile.json",
      "account_information/account_information.json",
    ];

    // Process followers
    for (const fileName of possibleFollowerFiles) {
      const file = zipContent.file(fileName);
      if (file) {
        const content = await file.async("string");
        followers = parseInstagramFollowers(content);
        rawData.followers_1 = JSON.parse(content);
        break;
      }
    }

    // Process following
    for (const fileName of possibleFollowingFiles) {
      const file = zipContent.file(fileName);
      if (file) {
        const content = await file.async("string");
        following = parseInstagramFollowing(content);
        rawData.following = JSON.parse(content);
        break;
      }
    }

    // Process profile to get username
    for (const fileName of possibleProfileFiles) {
      const file = zipContent.file(fileName);
      if (file) {
        const content = await file.async("string");
        username = getUsername(content);
        rawData.profile = JSON.parse(content);
        break;
      }
    }

    // If no specific files found, list all available files
    if (followers.length === 0 && following.length === 0) {
      const availableFiles = Object.keys(zipContent.files).slice(0, 10);
      throw new Error(
        `Arquivos de seguidores/seguindo não encontrados. Arquivos disponíveis: ${availableFiles.join(
          ", "
        )}`
      );
    }

    return {
      username,
      followers,
      following,
      rawData,
    };
  };

  const handleFileUpload = async (file: File) => {
    try {
      setUploadError(null);
      setUploadSuccess(false);
      setIsProcessing(true);

      if (!file.name.toLowerCase().endsWith(".zip")) {
        throw new Error("Por favor, selecione um arquivo ZIP do Instagram");
      }

      if (file.size > 100 * 1024 * 1024) {
        // 100MB limit
        throw new Error("Arquivo muito grande. Máximo 100MB.");
      }

      const instagramData = await processInstagramZip(file);

      if (
        instagramData.followers.length === 0 &&
        instagramData.following.length === 0
      ) {
        throw new Error(
          "Não foram encontrados dados de seguidores ou seguindo no arquivo"
        );
      }

      setUploadSuccess(true);
      onDataUpload(instagramData);
    } catch (error) {
      setUploadError(
        error instanceof Error ? error.message : "Erro ao processar arquivo"
      );
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);

    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0) {
      handleFileUpload(files[0]);
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      handleFileUpload(files[0]);
    }
  };

  return (
    <div className="instagram-upload-container">
      <div className="upload-header">
        <h2>📸 Insta Check</h2>
        <p>Analise seus seguidores do Instagram com seus dados reais</p>
      </div>

      <div className="upload-instructions-main">
        <h3>📋 Como obter seus dados do Instagram:</h3>
        <ol>
          <li>
            Acesse{" "}
            <strong>
              Configurações → Privacidade → Baixar suas informações
            </strong>
          </li>
          <li>
            Selecione <strong>"Algumas das suas informações"</strong>
          </li>
          <li>
            Marque apenas <strong>"Conexões"</strong> ou{" "}
            <strong>"Seguidores e seguindo"</strong>
          </li>
          <li>
            Escolha formato <strong>JSON</strong> e baixe o arquivo ZIP
          </li>
          <li>Faça upload do arquivo aqui</li>
        </ol>
      </div>

      <div
        className={`upload-zone ${isDragOver ? "drag-over" : ""} ${
          uploadSuccess ? "success" : ""
        }`}
        onDrop={handleDrop}
        onDragOver={(e) => {
          e.preventDefault();
          setIsDragOver(true);
        }}
        onDragLeave={() => setIsDragOver(false)}
      >
        {isProcessing ? (
          <>
            <Loader size={48} className="spinning" />
            <h4>Processando arquivo...</h4>
            <p>Extraindo dados do Instagram</p>
          </>
        ) : uploadSuccess ? (
          <>
            <CheckCircle size={48} className="success-icon" />
            <h4>Arquivo processado com sucesso!</h4>
            <p>Dados carregados e prontos para análise</p>
          </>
        ) : (
          <>
            <FileArchive size={48} />
            <h4>Arraste seu arquivo ZIP do Instagram aqui</h4>
            <p>ou clique para selecionar</p>

            <input
              type="file"
              accept=".zip"
              onChange={handleFileInput}
              className="file-input"
              disabled={isProcessing}
            />
          </>
        )}
      </div>

      {uploadError && (
        <div className="upload-error">
          <AlertCircle size={16} />
          <span>{uploadError}</span>
        </div>
      )}

      <div className="upload-info">
        <div className="info-item">
          <FileArchive size={20} />
          <div>
            <strong>Formato aceito:</strong> Arquivo ZIP do Instagram
          </div>
        </div>
        <div className="info-item">
          <CheckCircle size={20} />
          <div>
            <strong>Privacidade:</strong> Todos os dados ficam no seu navegador
          </div>
        </div>
      </div>
    </div>
  );
}

export default InstagramUpload;
