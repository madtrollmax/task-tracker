# Реализовано: #

1. Создание/Удаление досок
2. Создание колонок
3. Адаптировано для мобильных телефонов/десктопов

# Развочивание в прод #
1. Собрать проект командой npm run build
2. Установть фрэемворк Express.js https://expressjs.com/ru/starter/installing.html
3. Создать каталог public в родительском каталоге с express.js
4. Создать в родительском каталоге с express.js файл app.js c содержимым
```
const express = require('express')
const app = express()
const port = 8080

app.use(express.static('public'));

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
```

5. Скопировать содержимое какталога Build текущего проекта в каталог public
6. Запусть проект командой node app.js в родительском каталоге с express.js
