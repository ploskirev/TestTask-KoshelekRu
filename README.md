# Koshelek-ru (test task)

## Описание
Небольшое приложение для работы с биржей Binance.
Содержит обертку, в которой присутсвуют 2 плагина:
* 1 плагин - шина событий. 
* 2 плагин - сервис для работы с binance. Добавляет методы для получения стакана по rest ($getData) и подписки на обновление стакана через сокет ($BinanceSocketService). 
Также присутствуют 2 компонента с бизнес-логикой: 
* Первый компонент отрисовывает стакан и изменения в нем.
* Второй компонент позволяет выбрать валютную пару для получения данных по ней и отрисовывает лучшую заявку по bid и ask в реальном времени.
Имеет адаптивный дизайн.
Сделано с применением БЭМ.

## Project setup
```
npm i
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```
