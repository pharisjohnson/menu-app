# Savorly

A visually stunning and highly interactive food recommendation and ordering application with advanced filtering and a seamless user experience.

[cloudflarebutton]

Savorly is a premium food recommendation and ordering application designed for an exceptional user experience. The application presents a curated menu in a beautiful, interactive interface. The design prioritizes visual appeal, with smooth animations, micro-interactions, and a sophisticated color palette to create an immersive and delightful journey from browsing to ordering.

## Key Features

-   **Captivating Hero Section:** A visually stunning introduction to the application.
-   **Dynamic Product Grid:** An interactive and filterable grid showcasing high-quality food items.
-   **Advanced Filtering:** An elegant sidebar to effortlessly filter the menu by category, price range, and dietary preferences.
-   **Seamless Cart Experience:** A non-intrusive, slide-out shopping cart for easy order management.
-   **Modern & Luxurious UI:** A clean, sophisticated design aesthetic with a premium feel.
-   **Responsive Perfection:** Flawless layouts across all device sizes, built with a mobile-first approach.
-   **Interactive Polish:** Smooth animations, hover states, and micro-interactions that delight users.

## Technology Stack

-   **Frontend:** React, Vite, TypeScript, Tailwind CSS
-   **UI Components:** shadcn/ui, Framer Motion, Lucide React
-   **State Management:** Zustand
-   **Backend Framework:** Hono
-   **Platform:** Cloudflare Workers
-   **Storage:** Cloudflare Durable Objects

## Getting Started

Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

-   [Node.js](https://nodejs.org/) (v18 or later)
-   [Bun](https://bun.sh/) package manager
-   [Wrangler CLI](https://developers.cloudflare.com/workers/wrangler/install-and-update/)

### Installation

1.  **Clone the repository:**
    ```sh
    git clone https://github.com/your-username/savorly.git
    cd savorly
    ```

2.  **Install dependencies:**
    This project uses Bun for package management.
    ```sh
    bun install
    ```

## Development

To start the local development server, which includes both the Vite frontend and the Hono backend worker, run the following command:

```sh
bun run dev
```

The application will be available at `http://localhost:3000`.

### Linting

To run the linter and check for code quality issues, use:

```sh
bun run lint
```

## Deployment

This project is configured for seamless deployment to Cloudflare Workers.

1.  **Login to Wrangler:**
    Authenticate the Wrangler CLI with your Cloudflare account.
    ```sh
    wrangler login
    ```

2.  **Deploy the application:**
    Run the deploy script, which will build the application and deploy it to your Cloudflare account.
    ```sh
    bun run deploy
    ```

Alternatively, you can deploy your own version of this project with a single click.

[cloudflarebutton]

## Project Structure

-   `src/`: Contains all the frontend React application code, including pages, components, hooks, and styles.
-   `worker/`: Contains the Hono backend code that runs on Cloudflare Workers, including API routes and entity definitions.
-   `shared/`: Contains TypeScript types and mock data shared between the frontend and the backend.
-   `public/`: Static assets that are served directly.

## License

This project is licensed under the MIT License.