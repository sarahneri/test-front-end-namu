# test-front-end-namu


## Como executar o projeto

Este projeto possui duas aplicações: **Web (React + TypeScript)** e **Mobile (React Native + TypeScript)**.

### Aplicação Web

**Pré-requisitos:** Node.js e npm instalados.

1. Acesse a pasta da aplicação:

   ```bash
   cd yoga-web
   ```

2. Instale as dependências:

   ```bash
   npm install
   ```

3. Inicie o servidor de desenvolvimento:

   ```bash
   npm run dev
   ```

4. Abra no navegador o endereço informado no terminal, geralmente:

   `http://localhost:5173`

### Aplicação Mobile

**Pré-requisitos:** Node.js, JDK 17, Android Studio, Android SDK e um emulador Android configurado.

1. Acesse a pasta da aplicação Mobile:

   ```bash
   cd yoga-mobile
   ```

2. Instale as dependências:

   ```bash
   npm install
   ```

3. Inicie o emulador pelo Android Studio.

4. Inicie o Metro Bundler:

   ```bash
   npx react-native start
   ```

5. Em outro terminal, execute:

   ```bash
   npx react-native run-android
   ```

O aplicativo será compilado e instalado no emulador Android.

###  Gerando e instalando o APK

Para gerar um APK de desenvolvimento, execute na pasta da aplicação Mobile:

```bash
cd android
./gradlew assembleDebug
```

Após a compilação, o APK estará disponível em:

```text
android/app/build/outputs/apk/debug/app-debug.apk
```

Para instalar no dispositivo Android conectado:

```bash
adb install -r android/app/build/outputs/apk/debug/app-debug.apk
```

**Observação:** o APK de debug pode precisar do Metro Bundler em execução. Para disponibilizar um APK independente, é necessário gerar uma versão release devidamente configurada e assinada.

###  Tecnologias utilizadas

- React e TypeScript — aplicação Web
- React Native e TypeScript — aplicação Mobile
- Node.js e npm — gerenciamento de dependências
- Android Studio — execução e testes Android
