/**
 * Скрипт для управления раскрывающимися статьями на странице RealityCollection.
 * Обеспечивает функциональность клика по заголовку для переключения видимости содержимого.
 */

// Используем IIFE (Immediately Invoked Function Expression) для изоляции глобальной области
(function() {
    'use strict'; // Включает строгий режим JavaScript для более безопасного и предсказуемого кода

    // Определяем константы для улучшения читаемости и поддержки кода
    // Это делает код более гибким: если классы изменятся, нужно будет поменять только здесь
    const ARTICLE_SELECTOR = '.expandable-article'; // Селектор для поиска родительского элемента статьи
    const CONTENT_SELECTOR = '.expandable-content'; // Селектор для поиска элемента содержимого (не используется напрямую в текущей функции, но определён для ясности)
    const EXPANDED_CLASS = 'expanded'; // Имя CSS-класса, обозначающего раскрытое состояние
    const HIDDEN_ATTR = 'hidden'; // Имя HTML-атрибута, обозначающего скрытое состояние

    /**
     * Переключает состояние раскрытия статьи по ID целевого элемента.
     * @param {string} targetId - ID элемента содержимого статьи (например, 'articleContent1').
     */
    function toggleArticleByTarget(targetId) {
        // Находим элемент содержимого по его ID
        const contentElement = document.getElementById(targetId);

        // Проверяем, существует ли элемент с таким ID
        if (!contentElement) {
            // Если элемент не найден, выводим ошибку в консоль браузера и завершаем выполнение функции
            console.error(`Элемент с id "${targetId}" не найден.`);
            return; // Выход из функции
        }

        // Находим ближайший родительский элемент, соответствующий селектору ARTICLE_SELECTOR
        // Это нужно для потенциального изменения стиля родительской статьи (например, стрелки)
        const article = contentElement.closest(ARTICLE_SELECTOR);

        // Проверяем, существует ли родительская статья
        if (!article) {
            // Если родительская статья не найдена, выводим ошибку и завершаем выполнение
            console.error(`Родительская статья для элемента с id "${targetId}" не найдена.`);
            return; // Выход из функции
        }

        // Проверяем текущее состояние элемента содержимого: есть ли у него класс 'expanded'
        const isExpanded = contentElement.classList.contains(EXPANDED_CLASS);

        if (isExpanded) {
            // Если элемент раскрыт (имеет класс 'expanded'), скрываем его
            contentElement.classList.remove(EXPANDED_CLASS); // Удаляем класс 'expanded'
            contentElement.setAttribute(HIDDEN_ATTR, ''); // Добавляем атрибут 'hidden', чтобы скрыть элемент
        } else {
            // Если элемент скрыт (не имеет класса 'expanded'), показываем его
            contentElement.classList.add(EXPANDED_CLASS); // Добавляем класс 'expanded'
            contentElement.removeAttribute(HIDDEN_ATTR); // Удаляем атрибут 'hidden', чтобы показать элемент
        }
    }

    // Делаем функцию глобально доступной, чтобы её можно было вызвать из HTML (onclick)
    // window — глобальный объект браузера
    window.toggleArticleByTarget = toggleArticleByTarget;

    // Закрывающая скобка для IIFE
})();