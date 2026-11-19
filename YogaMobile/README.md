This is a new [**React Native**](https://reactnative.dev) project, bootstrapped using [`@react-native-community/cli`](https://github.com/react-native-community/cli).

O repositório contém duas implementações Mobile, organizadas em diretórios distintos.

Estrutura do projeto

YogaMobile/
├── android/
├── App.tsx
├── index.js
└── mobile-app/
    └── mobile/
        ├── package.json
        └── ...

Versões disponíveis

Diretório

Descrição

YogaMobile/

Projeto React Native com configuração Android nativa e implementação da interface inicial de bem-estar.

YogaMobile/mobile-app/mobile/

Implementação funcional em React Native com Expo, contendo integração com a API, navegação e testes.

Implementação funcional: YogaMobile/mobile-app/mobile/

A implementação funcional foi desenvolvida utilizando React Native, TypeScript e Expo SDK 52.

 Executando a implementação funcional

Pré-requisitos:

Node.js e npm

Android Studio e Android SDK configurados

Emulador Android ou dispositivo compatível

Na raiz do repositório:

cd YogaMobile/mobile-app/mobile
npm install
npm run android

O comando npm run android inicia o ambiente Expo e tenta abrir a aplicação no Android.

Para iniciar apenas o servidor de desenvolvimento:

npm start

Executando os testes

Dentro de YogaMobile/mobile-app/mobile/:

npm test

Para verificar a tipagem TypeScript:

npm run typecheck

Para executar o ESLint:

npm run lint

 APK Android

O APK de desenvolvimento foi gerado a partir do projeto Android localizado em YogaMobile/.

Caminho do artefato:

YogaMobile/android/app/build/outputs/apk/debug/app-debug.apk

Esse APK corresponde ao projeto React Native da raiz de YogaMobile/, que contém a interface inicial estática.

Importante: o APK mencionado não deve ser confundido com a implementação funcional em YogaMobile/mobile-app/mobile/. Não há um APK da implementação Expo validado nesta entrega.

Por ser um APK de debug, sua execução pode depender do Metro Bundler.

Observações sobre a organização

A separação entre as implementações foi esclarecida para facilitar a identificação do código e evitar ambiguidades durante a execução e avaliação.

A versão Expo é a referência para consultar a implementação com integração à API, navegação e testes. A versão da raiz contém a interface inicial e a configuração Android nativa.

As duas implementações não devem ser consideradas equivalentes.
