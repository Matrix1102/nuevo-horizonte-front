import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import logo from '../assets/colegio-logo.png';
import background from "../assets/bg-login.jpg";
import bgLogo from "../assets/login-bg-logo.png";

export function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const success = login(email, password);
    
    if (success) {
      navigate('/dashboard');
    } else {
      setError('Credenciales incorrectas. Por favor, intenta de nuevo.');
    }
  };

  return (
    <div className="min-h-screen flex relative">
      {/* Imagen de fondo completa */}
      <img
        src={background}
        alt="Fondo de Login"
        className="fixed inset-0 w-full h-full object-cover z-0"
      />
      
      {/* Lado izquierdo - Overlay con degradado */}
      <div className="hidden lg:flex lg:w-1/2 relative z-10">
        <div className="absolute inset-0 bg-gradient-to-r from-primary-600/90 via-primary-700/70 to-transparent"></div>
        <div className="relative z-10 flex flex-col justify-center items-start p-16 text-white">
          <div className="bg-white/10 backdrop-blur-sm rounded-3xl shadow-2xl border border-white/20 mb-6">
            <img 
              src={bgLogo} 
              alt="Colegio Nuevo Horizonte" 
              className="w-40 h-40 object-contain"
            />
          </div>
          <h1 className="text-5xl font-bold mb-4 drop-shadow-lg">
            Nuevo Horizonte
          </h1>
          <p className="text-xl opacity-90 drop-shadow-md">
            Sistema de Gestión Escolar
          </p>
        </div>
      </div>

      {/* Lado derecho - Formulario */}
      <div className="w-full lg:w-1/2 flex items-center justify-center relative z-10 p-6">
        <div className="w-full max-w-md">
          {/* Logo móvil */}
          <div className="lg:hidden flex justify-center mb-8">
            <img 
              src={logo} 
              alt="Colegio Nuevo Horizonte" 
              className="w-40 h-40 object-contain drop-shadow-2xl"
            />
          </div>

          {/* Barras decorativas superiores */}
          <div className="flex gap-1 mb-4">
            <div className="h-1 flex-1 bg-primary-500 rounded"></div>
            <div className="h-1 flex-1 bg-accent-400 rounded"></div>
            <div className="h-1 flex-1 bg-warm-400 rounded"></div>
          </div>

          {/* Card del formulario */}
          <div className="bg-white/10 backdrop-blur-md rounded-2xl shadow-2xl p-6 border border-white/20">
            <div className="flex justify-center mb-2">
              <img 
                src={logo} 
                alt="Colegio Nuevo Horizonte" 
                className="w-32 h-32 object-contain"
              />
            </div>

            <h2 className="text-center text-2xl font-bold text-white mb-2 drop-shadow-lg">
              Bienvenido
            </h2>
            <p className="text-center text-white/90 mb-8 text-sm drop-shadow-md">
              Ingresa tus credenciales para continuar
            </p>

            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
              {/* Email */}
              <div className="flex flex-col gap-2 relative">
                <label htmlFor="email" className="text-white font-medium text-sm flex items-center gap-2 drop-shadow-md">
                  <span className="text-accent-300">🔑</span>
                  Usuario
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                    👤
                  </span>
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-12 pr-12 py-3 border-2 border-white/30 bg-white/90 rounded-xl text-base transition-all focus:outline-none focus:border-accent-500 focus:shadow-lg focus:bg-white"
                    placeholder="E0567"
                    required
                  />
                </div>
              </div>

              {/* Password */}
              <div className="flex flex-col gap-2 relative">
                <label htmlFor="password" className="text-white font-medium text-sm flex items-center gap-2 drop-shadow-md">
                  <span className="text-accent-300">🔒</span>
                  Contraseña
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                    🔒
                  </span>
                  <input
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-12 pr-12 py-3 border-2 border-white/30 bg-white/90 rounded-xl text-base transition-all focus:outline-none focus:border-accent-500 focus:shadow-lg focus:bg-white"
                    placeholder="••••••••"
                    required
                  />
                </div>
              </div>

              {error && (
                <div className="bg-red-50 text-red-600 px-4 py-3 rounded-xl text-sm border-l-4 border-red-600">
                  {error}
                </div>
              )}

              {/* Botón de ingreso */}
              <button 
                type="submit" 
                className="bg-primary-600 text-white px-6 py-4 rounded-xl text-base font-semibold cursor-pointer transition-all hover:bg-accent-400 hover:shadow-xl active:scale-95 mt-2 flex items-center justify-center gap-2"
              >
                Ingresar
                <span className="text-lg">→</span>
              </button>
            </form>
          </div>

          {/* Barras decorativas inferiores */}
          <div className="flex gap-1 mt-4">
            <div className="h-1 flex-1 bg-warm-400 rounded"></div>
            <div className="h-1 flex-1 bg-accent-400 rounded"></div>
            <div className="h-1 flex-1 bg-primary-500 rounded"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
