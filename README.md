# BookNest

BookNest is a personal library app for organizing books and keeping track of your reading

## Technologies

- `client/` — Next.js 16, React 19, TypeScript, Tailwind CSS
- `server/` — Express 5, TypeScript, Prisma ORM, PostgreSQL, and Zod

## Main Features

- Add, edit, view, and delete books
- Organize books by genre and reading status: Want to Read, Currently Reading,
  and Finished
- Search, filter, and sort your library
- Add ratings, descriptions, and personal notes
- Add a cover image using a URL or upload one from your device
- View reading statistics by status and genre
- Get clear error messages and confirmation before deleting a book

## Live Demo

- https://book-nest-puce.vercel.app/

## Installation and Running the Application

1. Clone the repository to your device:
   
- git clone https://github.com/lerkooow/BookNest.git

2. Install frontend dependencies:

- cd client
- npm install

3. Install backend dependencies:

- cd ../server
- npm install
- npx prisma migrate dev

4. Start the application/server:

- npm run dev

# BookNest

BookNest — это приложение для ведения личной библиотеки, которое позволяет организовывать книги и отслеживать процесс чтения.

## Технологии

- `client/` — Next.js 16, React 19, TypeScript, Tailwind CSS.
- `server/` — Express 5, TypeScript, Prisma ORM, PostgreSQL и Zod.

## Основные возможности

- Добавление, редактирование, просмотр и удаление книг.
- Организация книг по жанрам и статусам чтения: «Хочу прочитать», «Читаю сейчас» и «Прочитано».
- Поиск, фильтрация и сортировка библиотеки.
- Добавление оценок, описаний и личных заметок к книгам.
- Добавление обложки книги по URL или загрузка изображения с устройства.
- Просмотр статистики чтения по статусам и жанрам.
- Понятные сообщения об ошибках и подтверждение перед удалением книги.

## Демо-версия

- https://book-nest-puce.vercel.app/

## Установка и запуск приложения

1. Клонируйте репозиторий на своё устройство:

- git clone https://github.com/lerkooow/BookNest.git

2. Установите зависимости фронтенда:

- cd client
- npm install

3. Установите зависимости бэкенда и выполните миграции базы данных:

- cd ../server
- npm install
- npx prisma migrate dev

5. Запустите приложение или сервер:

- npm run dev
  
