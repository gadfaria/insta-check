# 📁 Exemplo de Dados do Instagram

Este arquivo mostra como seria a estrutura dos dados exportados do Instagram que o Insta Check pode processar.

## 📂 Estrutura do arquivo ZIP

```
instagram-username-20240123.zip
├── connections/
│   └── followers_and_following/
│       ├── followers_1.json
│       └── following.json
└── personal_information/
    └── personal_information.json
```

## 📄 Exemplo: followers_1.json

```json
[
  {
    "title": "",
    "media_list_data": [],
    "string_list_data": [
      {
        "href": "https://www.instagram.com/usuario1",
        "value": "usuario1",
        "timestamp": 1642723200
      }
    ]
  },
  {
    "title": "",
    "media_list_data": [],
    "string_list_data": [
      {
        "href": "https://www.instagram.com/usuario2", 
        "value": "usuario2",
        "timestamp": 1642723200
      }
    ]
  }
]
```

## 📄 Exemplo: following.json

```json
[
  {
    "title": "",
    "media_list_data": [],
    "string_list_data": [
      {
        "href": "https://www.instagram.com/instagram",
        "value": "instagram",
        "timestamp": 1642723200
      }
    ]
  },
  {
    "title": "",
    "media_list_data": [],
    "string_list_data": [
      {
        "href": "https://www.instagram.com/usuario1",
        "value": "usuario1", 
        "timestamp": 1642723200
      }
    ]
  }
]
```

## 📄 Exemplo: personal_information.json

```json
{
  "profile_user": [
    {
      "string_list_data": [
        {
          "value": "seu_username",
          "timestamp": 1642723200
        }
      ]
    }
  ]
}
```

## 🎯 O que o Insta Check faz com esses dados

1. **Extrai o arquivo ZIP** automaticamente
2. **Localiza os arquivos** de seguidores e seguindo
3. **Processa os dados JSON** para extrair os usernames
4. **Calcula estatísticas**:
   - Seguidores mútuos
   - Pessoas que não te seguem de volta
   - Taxa de reciprocidade
   - Insights estatísticos
5. **Apresenta visualmente** em um dashboard interativo

## 🔒 Privacidade

- Todo o processamento acontece no seu navegador
- Nenhum dado é enviado para servidores externos  
- Os arquivos são processados localmente usando JavaScript
- Você pode verificar o código fonte para confirmar
