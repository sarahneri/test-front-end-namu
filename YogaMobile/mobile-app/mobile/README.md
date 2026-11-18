# Prana · App Android (React Native + Expo)

Mesma API e mesmas regras do front web: catálogo com **busca e scroll infinito**, filtro por categoria,
detalhe e favoritos com **atualização otimista** e reversão em caso de erro.

Stack: Expo SDK 52, React Native, TypeScript, React Navigation, TanStack Query, Jest + React Native Testing Library.

## Como rodar

Pré-requisitos: Node 18.18+, a API rodando (`node server.js`, porta 3333) e **um** destes:
- Emulador Android (Android Studio > Device Manager), ou
- Celular Android com o app **Expo Go** instalado.

```bash
cd mobile
npm install
npx expo install --fix      # alinha as versões nativas com a sua versão do Expo
npm run android             # abre no emulador; ou "npm start" e leia o QR code com o Expo Go
```

### Endereço da API

| Onde o app roda | Endereço usado |
|---|---|
| Emulador Android | `http://10.0.2.2:3333` (automático: é o seu computador visto pelo emulador) |
| Celular físico | defina `EXPO_PUBLIC_API_URL=http://IP-DO-SEU-PC:3333` (ex.: `192.168.0.10`) |

Celular e computador precisam estar na mesma rede Wi-Fi, e o firewall do Windows pode pedir permissão para o Node.
Copie `.env.example` para `.env` e preencha, depois reinicie com `npx expo start -c`.
A API devolve as imagens com `localhost`; `src/lib/api.ts` troca esse trecho pelo endereço configurado.

## Testes e lint

```bash
npm test          # Jest + React Native Testing Library
npm run lint
npm run typecheck
```

## Decisões

- **Scroll infinito:** `useInfiniteQuery` + `FlatList` (`onEndReached`), com indicador de carregamento no rodapé e botão de nova tentativa se uma página falhar.
- **Performance:** `memo` nos cards, `useCallback`/`useMemo`, cache do React Query, `windowSize`/`initialNumToRender`/`removeClippedSubviews` na lista.
- **Animações:** entrada em fade e leve escala ao tocar nos cards, pulso no botão de favoritar, skeleton pulsando (todas com `useNativeDriver`).
- **Acessibilidade:** `accessibilityRole`/`accessibilityLabel`/`accessibilityState` nos controles, alvos de toque de 44–48 dp, tema claro/escuro automático.
- **Código compartilhado com o web:** `src/lib/types.ts`, `src/lib/format.ts`, `src/lib/api.ts` e `src/hooks/queries.ts` são os mesmos do web
  (a única diferença é `src/lib/config.ts`, que define a URL base). Para compartilhar de verdade, mova-os para um pacote do monorepo
  (por exemplo `packages/shared`) e importe nos dois apps.

## CI

O workflow `.github/workflows/mobile.yml` (na raiz do repositório) roda lint, typecheck e testes quando algo em `mobile/` muda.

## Build de produção (opcional)

Em builds de release o Android bloqueia `http://` sem TLS. Use uma API em HTTPS ou habilite cleartext com `expo-build-properties`.
