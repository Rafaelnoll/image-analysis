![GitHub](https://img.shields.io/badge/github-repo-blue?logo=github) ![Coverage](https://img.shields.io/badge/coverage-100%25-brightgreen)

# 📸 Serverless Image Analysis API

A **serverless API** that analyzes images using **AWS Rekognition** and automatically **translates detected labels into Portuguese**.

## 🚀 Features

- 🧠 Image analysis using **AWS Rekognition**
- 🌍 Automatic translation of detected labels to **Portuguese**
- ⚡ Fast execution using **AWS Lambda**
- 📦 Deployment with **Serverless Framework**

## 🛠️ Tech Stack

- **Node.js**
- **AWS Lambda**
- **AWS Rekognition**
- **AWS Translate**
- **Serverless Framework**

## ⚙️ Requirements

- Node.js **v20+**
- AWS Account
- AWS CLI configured (For Serverless Framework)

---

## 📦 Installation

```bash
git clone https://github.com/Rafaelnoll/image-analysis.git
cd image-analysis
npm install
```

---

## ▶️ Running Locally

```bash
npm run invoke-local
```

---

## ☁️ Deploying to AWS

```bash
npm run deploy
```

After deployment, the API endpoint will be shown in the terminal.

---

## 📥 Example Request

### CURL (Example)

```bash
curl https://API_HOST/analyse?imageUrl=IMAGE_URL
```

### Response

```text
A imagem tem
99.96% de ser do tipo Animal
99.96% de ser do tipo canino
99.96% de ser do tipo cão
99.96% de ser do tipo golden retriever
99.96% de ser do tipo mamífero
99.96% de ser do tipo animal de estimação
```

---

## 🧪 Testing

```bash
npm test
```
