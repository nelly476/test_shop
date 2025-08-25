import { Routes, Route} from 'react-router-dom';
import { HomePage } from './pages/HomePage';



export default function App() {
  return (
    // <CartSidebarProvider>
      <div className="app">
        {/* <TopNav /> */}
        <Routes>
          <Route path="/" element={<HomePage />} />
          {/* <Route path="/category/:cat" element={<CategoryPage />} /> */}
        </Routes>
        {/* <CartSidebar /> */}
      </div>
    // </CartSidebarProvider>
  );
}

