# E-commerce Project

This is a simple e-commerce web application built with Angular using JSON Server as the backend. The project implements basic e-commerce functionalities, including user authentication, product filtering, and a shopping cart system.

## Features

- **User Authentication**: Users can sign up, log in, and log out securely.
- **Shopping Cart**: Add products to the cart, with cart data stored .
- **Product Filtering**: Filter products based on their categories using category IDs.
- **Responsive Design**: The application is responsive and user-friendly across devices.

## Technologies Used

- **Frontend**: Angular, Tailwind CSS
- **Backend**: JSON Server
- **Styling**: Tailwind CSS

## Demo



https://github.com/user-attachments/assets/09ffb89f-7d8e-46f4-98f7-a67128e43fcc


## How to Run the Project

1. **Clone the repository**:
    ```bash
    git clone https://github.com/your-username/your-repo-name.git
    cd your-repo-name
    ```

2. **Install dependencies**:
    ```bash
    npm install
    ```

3. **Start the JSON Server**:
    ```bash
    json-server --watch db.json
    ```

4. **Run the Angular development server**:
    ```bash
    ng serve
    ```

5. Open your browser and navigate to `http://localhost:4200/` to see the app in action.

## How It Works

- **Authentication**: Users can sign up and log in, with session data stored in cookies.
- **Add to Cart**: Users can add products to the cart, and the cart items are managed using cookies.
- **Product Filtering**: Products can be filtered by category using their category ID.
  
## Future Enhancements

- Payment integration
- Enhanced product search
- Order history and user profiles

