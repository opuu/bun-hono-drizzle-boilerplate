# Boilerplate: Bun, Hono, Drizzle ORM

A well-structured boilerplate for building restful APIs with Bun, Hono, and Drizzle ORM.

## Features

-   **Bun**: Fast alternative to Node.js
-   **Hono**: A very fast and lightweight express.js alternative
-   **Drizzle ORM**: A simple and lightweight ORM

## TODO

-   [ ] Validation with `zod`
-   [ ] Testing
-   [ ] Documentation
-   [ ] Dockerize the application
-   [ ] Add more features

> **Feel free to contribute!**

## Getting Started

### Installation

```bash
git clone git@github.com:opuu/bun-hono-drizzle-boilerplate.git
cd bun-hono-drizzle-boilerplate
bun install
```

### Database Configuration

```bash
cp .env.example .env
```

Update the `.env` file with your database credentials.

Now you can run the migrations:

```bash
bun run migration:generate
bun run migration:push
```

> **Note**: Make sure you have the database created before running the migrations.

### Running the Application

```bash
bun run dev
```

## Building for Production

```bash
bun run build
```

then you can start the application with:

```bash
bun run start
```

or in single command:

```bash
bun run build:start
```

## License

This project is open-sourced software licensed under the [MIT license](https://opensource.org/licenses/MIT).
