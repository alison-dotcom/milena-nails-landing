import { useState } from 'react';
import Head from 'next/head';

export default function Home() {
  const [formData, setFormData] = useState({ nome: '', telefone: '' });
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showGuide, setShowGuide] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    let formattedValue = value;

    // Máscara para telefone
    if (name === 'telefone') {
      formattedValue = value.replace(/\D/g, '');
      if (formattedValue.length >= 11) {
        formattedValue = formattedValue.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
      } else if (formattedValue.length >= 7) {
        formattedValue = formattedValue.replace(/(\d{2})(\d{4})(\d{0,4})/, '($1) $2-$3');
      } else if (formattedValue.length >= 3) {
        formattedValue = formattedValue.replace(/(\d{2})(\d{0,5})/, '($1) $2');
      }
    }

    setFormData(prev => ({ ...prev, [name]: formattedValue }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch('/api/salvar', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setShowSuccess(true);
        setTimeout(() => {
          setShowGuide(true);
          setShowSuccess(false);
        }, 2000);
      } else {
        alert('Erro ao enviar dados. Tente novamente.');
      }
    } catch (error) {
      console.error('Erro:', error);
      alert('Erro ao enviar dados. Tente novamente.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Head>
        <title>Milena Rocha Nails Design - Guia Completo de Unhas</title>
        <meta name="description" content="Descubra os segredos para unhas perfeitas em acrílico, gel e esmaltação que duram mais com Milena Rocha Nails Design" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700;900&family=Poppins:wght@300;400;500;600&display=swap" rel="stylesheet" />
        <style>{`
          * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
          }

          body {
            font-family: 'Poppins', sans-serif;
            line-height: 1.6;
            color: #2c2c2c;
            background: linear-gradient(135deg, #faf7f4 0%, #f0e6dd 100%);
          }

          .container {
            max-width: 1200px;
            margin: 0 auto;
            padding: 0 20px;
          }

          /* Header */
          .header {
            background: linear-gradient(135deg, #d4af37 0%, #b8941f 50%, #8b6914 100%);
            color: white;
            padding: 30px 0;
            box-shadow: 0 8px 30px rgba(212, 175, 55, 0.3);
            position: relative;
            overflow: hidden;
          }

          .header::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: radial-gradient(circle at 30% 50%, rgba(255,255,255,0.1) 0%, transparent 50%);
          }

          .header-content {
            position: relative;
            z-index: 1;
            text-align: center;
          }

          .logo {
            font-family: 'Playfair Display', serif;
            font-size: 3.2rem;
            font-weight: 900;
            margin-bottom: 15px;
            text-shadow: 3px 3px 6px rgba(0,0,0,0.3);
            letter-spacing: 3px;
            line-height: 1.1;
          }

          .subtitle {
            font-family: 'Playfair Display', serif;
            font-size: 1.3rem;
            opacity: 0.95;
            font-style: italic;
            letter-spacing: 2px;
            font-weight: 400;
          }

          /* Hero Section */
          .hero {
            background: linear-gradient(135deg, rgba(244, 230, 220, 0.8) 0%, rgba(255, 245, 238, 0.9) 100%);
            padding: 100px 0;
            text-align: center;
            position: relative;
          }

          .hero h1 {
            font-family: 'Playfair Display', serif;
            font-size: 3.2rem;
            color: #2c2c2c;
            margin-bottom: 40px;
            line-height: 1.3;
            text-shadow: 1px 1px 3px rgba(0,0,0,0.1);
            font-weight: 700;
          }

          .hero-highlight {
            background: linear-gradient(135deg, #d4af37, #b8941f);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
            font-weight: 900;
          }

          /* Capture Section */
          .capture-section {
            background: linear-gradient(135deg, #2c2c2c 0%, #1a1a1a 100%);
            color: white;
            padding: 100px 0;
            position: relative;
          }

          .capture-content {
            text-align: center;
            max-width: 600px;
            margin: 0 auto;
          }

          .capture-badge {
            display: inline-block;
            background: linear-gradient(135deg, #d4af37, #b8941f);
            color: white;
            padding: 15px 35px;
            border-radius: 50px;
            font-weight: 600;
            font-size: 1rem;
            letter-spacing: 1px;
            margin-bottom: 30px;
            text-transform: uppercase;
          }

          .capture-title {
            font-family: 'Playfair Display', serif;
            font-size: 2.8rem;
            margin-bottom: 25px;
            color: white;
            font-weight: 700;
          }

          .capture-subtitle {
            font-size: 1.2rem;
            opacity: 0.9;
            margin-bottom: 50px;
            line-height: 1.7;
          }

          .form-container {
            background: rgba(255, 255, 255, 0.1);
            backdrop-filter: blur(15px);
            border: 1px solid rgba(255, 255, 255, 0.2);
            border-radius: 25px;
            padding: 50px 40px;
          }

          .form-group {
            margin-bottom: 25px;
          }

          .form-group input {
            width: 100%;
            padding: 18px 25px;
            border: none;
            border-radius: 15px;
            font-size: 1.1rem;
            background: rgba(255, 255, 255, 0.95);
            color: #2c2c2c;
            transition: all 0.3s ease;
            font-family: 'Poppins', sans-serif;
          }

          .form-group input:focus {
            outline: none;
            background: white;
            box-shadow: 0 0 25px rgba(212, 175, 55, 0.4);
            transform: translateY(-2px);
          }

          .form-group input::placeholder {
            color: #999;
          }

          .submit-btn {
            width: 100%;
            background: linear-gradient(135deg, #d4af37, #b8941f);
            color: white;
            padding: 20px 35px;
            border: none;
            border-radius: 15px;
            font-size: 1.2rem;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.3s ease;
            text-transform: uppercase;
            letter-spacing: 1px;
            font-family: 'Poppins', sans-serif;
          }

          .submit-btn:hover:not(:disabled) {
            transform: translateY(-3px);
            box-shadow: 0 12px 35px rgba(212, 175, 55, 0.5);
          }

          .submit-btn:disabled {
            opacity: 0.7;
            cursor: not-allowed;
          }

          .success-message {
            background: linear-gradient(135deg, #28a745, #20c997);
            color: white;
            padding: 30px;
            border-radius: 20px;
            text-align: center;
            animation: fadeInScale 0.5s ease;
          }

          .success-message h3 {
            font-size: 1.5rem;
            margin-bottom: 10px;
          }

          /* Guide Section */
          .guide-section {
            padding: 100px 0;
            background: white;
          }

          .section-title {
            text-align: center;
            font-family: 'Playfair Display', serif;
            font-size: 2.8rem;
            color: #2c2c2c;
            margin-bottom: 25px;
            position: relative;
            font-weight: 700;
          }

          .section-title::after {
            content: '';
            display: block;
            width: 100px;
            height: 4px;
            background: linear-gradient(135deg, #d4af37, #b8941f);
            margin: 30px auto;
            border-radius: 2px;
          }

          .section-subtitle {
            text-align: center;
            font-size: 1.3rem;
            color: #666;
            margin-bottom: 80px;
            font-style: italic;
            font-family: 'Playfair Display', serif;
          }

          .cards-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
            gap: 40px;
            margin-bottom: 60px;
          }

          .card {
            background: white;
            border-radius: 25px;
            padding: 45px 35px;
            box-shadow: 0 15px 50px rgba(0,0,0,0.08);
            border: 1px solid rgba(212, 175, 55, 0.2);
            transition: all 0.4s ease;
            position: relative;
            overflow: hidden;
          }

          .card::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            height: 5px;
            background: linear-gradient(135deg, #d4af37, #b8941f);
            border-radius: 25px 25px 0 0;
          }

          .card:hover {
            transform: translateY(-12px);
            box-shadow: 0 25px 60px rgba(0,0,0,0.15);
          }

          .card-icon {
            font-size: 3.5rem;
            margin-bottom: 25px;
            display: block;
            line-height: 1;
          }

          .card h3 {
            font-family: 'Playfair Display', serif;
            font-size: 1.8rem;
            color: #2c2c2c;
            margin-bottom: 25px;
            font-weight: 700;
          }

          .card-content p {
            color: #666;
            line-height: 1.8;
            margin-bottom: 20px;
            font-weight: 500;
          }

          .card-content p strong {
            color: #d4af37;
            font-weight: 600;
          }

          .card-content ul {
            list-style: none;
            padding-left: 0;
            margin-bottom: 25px;
          }

          .card-content li {
            color: #555;
            margin-bottom: 12px;
            padding-left: 25px;
            position: relative;
            line-height: 1.6;
            font-weight: 400;
          }

          .card-content li::before {
            content: '💅';
            position: absolute;
            left: 0;
            font-size: 1rem;
          }

          /* Footer */
          .footer {
            background: linear-gradient(135deg, #1a1a1a 0%, #2c2c2c 100%);
            color: white;
            padding: 80px 0 40px;
          }

          .footer-content {
            text-align: center;
            margin-bottom: 40px;
          }

          .footer-section h3 {
            font-family: 'Playfair Display', serif;
            color: #d4af37;
            margin-bottom: 25px;
            font-size: 1.8rem;
            font-weight: 700;
          }

          .footer-section p {
            color: #ccc;
            margin-bottom: 30px;
            line-height: 1.7;
            max-width: 600px;
            margin-left: auto;
            margin-right: auto;
            font-size: 1.1rem;
          }

          .social-links {
            display: flex;
            justify-content: center;
            margin-top: 30px;
          }

          .social-links a {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            padding: 15px 30px;
            background: linear-gradient(135deg, #d4af37, #b8941f);
            color: white;
            border-radius: 50px;
            text-decoration: none;
            font-size: 1.1rem;
            font-weight: 600;
            transition: all 0.3s ease;
            letter-spacing: 1px;
          }

          .social-links a:hover {
            transform: translateY(-3px);
            box-shadow: 0 10px 30px rgba(212, 175, 55, 0.4);
          }

          .footer-bottom {
            text-align: center;
            padding-top: 40px;
            border-top: 1px solid #333;
            color: #999;
            font-size: 0.95rem;
          }

          /* Animations */
          @keyframes fadeInScale {
            from {
              opacity: 0;
              transform: scale(0.9);
            }
            to {
              opacity: 1;
              transform: scale(1);
            }
          }

          /* Responsive Design */
          @media (max-width: 768px) {
            .logo {
              font-size: 2.2rem;
            }
            
            .subtitle {
              font-size: 1rem;
            }
            
            .hero h1 {
              font-size: 2.2rem;
              line-height: 1.2;
            }
            
            .capture-title {
              font-size: 2rem;
            }
            
            .section-title {
              font-size: 2rem;
            }
            
            .cards-grid {
              grid-template-columns: 1fr;
              gap: 30px;
            }
            
            .card {
              padding: 35px 25px;
            }
            
            .form-container {
              padding: 40px 25px;
            }
            
            .container {
              padding: 0 15px;
            }
          }

          @media (max-width: 480px) {
            .hero {
              padding: 60px 0;
            }
            
            .capture-section {
              padding: 60px 0;
            }
            
            .guide-section {
              padding: 60px 0;
            }
            
            .hero h1 {
              font-size: 1.8rem;
            }
            
            .capture-title {
              font-size: 1.6rem;
            }
          }
        `}</style>
      </Head>

      <main>
        {/* Header */}
        <header className="header">
          <div className="container">
            <div className="header-content">
              <h1 className="logo">Milena Rocha Nails Design</h1>
              <p className="subtitle">Arte e cuidado com suas unhas em cada detalhe</p>
            </div>
          </div>
        </header>

        {/* Hero Section */}
        <section className="hero">
          <div className="container">
            <h1>Descubra os segredos para <span className="hero-highlight">unhas perfeitas</span> em acrílico, gel e esmaltação que <span className="hero-highlight">duram mais</span></h1>
          </div>
        </section>

        {/* Formulário de Captura */}
        <section className="capture-section">
          <div className="container">
            <div className="capture-content">
              <span className="capture-badge">💅 Acesso Gratuito</span>
              <h2 className="capture-title">Receba o Guia Completo Agora</h2>
              <p className="capture-subtitle">
                Aprenda técnicas profissionais e segredos para unhas perfeitas.<br />
                <strong>100% Gratuito • Acesso Imediato</strong>
              </p>
              
              {!showSuccess && !showGuide && (
                <div className="form-container">
                  <form onSubmit={handleSubmit}>
                    <div className="form-group">
                      <input
                        type="text"
                        name="nome"
                        placeholder="Seu nome completo"
                        value={formData.nome}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    
                    <div className="form-group">
                      <input
                        type="tel"
                        name="telefone"
                        placeholder="(11) 99999-9999"
                        value={formData.telefone}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    
                    <button type="submit" className="submit-btn" disabled={isLoading}>
                      {isLoading ? '⏳ Enviando...' : '💅 Quero o Guia Gratuito'}
                    </button>
                  </form>
                </div>
              )}

              {showSuccess && (
                <div className="success-message">
                  <h3>🎉 Sucesso!</h3>
                  <p>Dados salvos! Carregando seu guia exclusivo...</p>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Guia Completo - Mostra após formulário */}
        {showGuide && (
          <section className="guide-section">
            <div className="container">
              <h2 className="section-title">🎁 Seu Guia Completo de Unhas</h2>
              <p className="section-subtitle">Parabéns! Aqui estão todas as técnicas profissionais</p>
              
              <div className="cards-grid">
                {/* Card 1: Unhas em Acrílico */}
                <div className="card">
                  <span className="card-icon">💅</span>
                  <h3>Unhas em Acrílico</h3>
                  <div className="card-content">
                    <p><strong>🏆 Vantagens do Acrílico:</strong></p>
                    <ul>
                      <li>Resistência superior - ideal para quem trabalha muito com as mãos</li>
                      <li>Durabilidade de 3-4 semanas sem descascar</li>
                      <li>Perfeito para alongamentos e formatos estruturados</li>
                      <li>Base ideal para nail arts elaboradas e 3D</li>
                      <li>Secagem rápida ao ar livre</li>
                    </ul>
                    
                    <p><strong>🔧 Cuidados Essenciais:</strong></p>
                    <ul>
                      <li>Use sempre luvas para limpeza pesada e jardinagem</li>
                      <li>Hidrate cutículas diariamente com óleo específico</li>
                      <li>NUNCA use as unhas como ferramentas (abrir latas, etc.)</li>
                      <li>Faça manutenção a cada 15-20 dias</li>
                      <li>Remova apenas com profissional para evitar danos</li>
                    </ul>

                    <p><strong>💡 Dica Profissional:</strong></p>
                    <p>Aplique uma gotinha de óleo de cutícula na lateral das unhas antes de dormir. Isso mantém a flexibilidade e evita rachaduras.</p>
                  </div>
                </div>

                {/* Card 2: Alongamento em Gel */}
                <div className="card">
                  <span className="card-icon">💎</span>
                  <h3>Alongamento em Gel</h3>
                  <div className="card-content">
                    <p><strong>✨ Quando Escolher Gel:</strong></p>
                    <ul>
                      <li>Visual mais natural e movimento flexível</li>
                      <li>Menos agressivo à unha natural</li>
                      <li>Secagem instantânea com cabine LED/UV</li>
                      <li>Ideal para unhas sensíveis ou danificadas</li>
                      <li>Acabamento brilhante duradouro</li>
                    </ul>
                    
                    <p><strong>🛠️ Manutenção Correta:</strong></p>
                    <ul>
                      <li>Retoque profissional a cada 2-3 semanas</li>
                      <li>Use base fortalecedora entre aplicações</li>
                      <li>Evite produtos com acetona pura</li>
                      <li>Proteja do ressecamento com cremes específicos</li>
                      <li>Remoção sempre profissional com lixamento suave</li>
                    </ul>

                    <p><strong>⚠️ Cuidado Especial:</strong></p>
                    <p>Se notar descolamento nas bordas, procure um profissional imediatamente. Não puxe ou force a remoção!</p>
                  </div>
                </div>

                {/* Card 3: Esmaltação Profissional */}
                <div className="card">
                  <span className="card-icon">🌟</span>
                  <h3>Esmaltação Profissional</h3>
                  <div className="card-content">
                    <p><strong>🎯 Preparação Perfeita:</strong></p>
                    <ul>
                      <li>Retire completamente esmalte anterior com algodão</li>
                      <li>Empurre cutículas com espátula após amolecimento</li>
                      <li>Lima no formato desejado com movimentos unidirecionais</li>
                      <li>Desengordue com álcool 70% ou primer</li>
                      <li>Aplique base específica para seu tipo de unha</li>
                    </ul>
                    
                    <p><strong>🎨 Técnica de Aplicação:</strong></p>
                    <ul>
                      <li>Camadas finas e uniformes (3 pinceladas máximo)</li>
                      <li>Comece pelo meio, depois laterais</li>
                      <li>Deixe secar completamente entre camadas (2-3 min)</li>
                      <li>2 camadas de cor + base + top coat</li>
                      <li>Finalize com óleo de cutícula</li>
                    </ul>

                    <p><strong>🔒 Segredos para Durar 7+ Dias:</strong></p>
                    <ul>
                      <li>Evite água muito quente nas primeiras 4 horas</li>
                      <li>Use luvas para lavar louça e produtos químicos</li>
                      <li>Reaplique top coat a cada 2-3 dias</li>
                      <li>Hidrate cutículas diariamente</li>
                      <li>Faça movimentos suaves ao abrir coisas</li>
                    </ul>
                  </div>
                </div>

                {/* Card 4: Troubleshooting */}
                <div className="card">
                  <span className="card-icon">🔧</span>
                  <h3>Soluções para Problemas</h3>
                  <div className="card-content">
                    <p><strong>🚨 Problemas Comuns & Soluções:</strong></p>
                    
                    <p><strong>Esmalte descascando rápido:</strong></p>
                    <ul>
                      <li>✅ Use sempre base + 2 camadas + top coat</li>
                      <li>✅ Desengordue bem antes da aplicação</li>
                      <li>✅ Evite cremes nas mãos antes de esmaltar</li>
                    </ul>

                    <p><strong>Bolhas no esmalte:</strong></p>
                    <ul>
                      <li>✅ Aplique camadas mais finas</li>
                      <li>✅ Deixe secar mais tempo entre camadas</li>
                      <li>✅ Evite balançar o frasco (gira entre as palmas)</li>
                    </ul>

                    <p><strong>Cutículas ressecadas:</strong></p>
                    <ul>
                      <li>✅ Óleo de cutícula 2x ao dia</li>
                      <li>✅ Hidratante específico para mãos</li>
                      <li>✅ Evite retirar cutículas secas</li>
                    </ul>

                    <p><strong>Unha quebradiça:</strong></p>
                    <ul>
                      <li>✅ Base fortalecedora 3x por semana</li>
                      <li>✅ Suplemento de biotina</li>
                      <li>✅ Evite lixas muito grossas</li>
                    </ul>
                  </div>
                </div>

                {/* Card 5: Kit Essencial */}
                <div className="card">
                  <span className="card-icon">🎁</span>
                  <h3>Kit Essencial para Casa</h3>
                  <div className="card-content">
                    <p><strong>🧰 Ferramentas Básicas:</strong></p>
                    <ul>
                      <li>Lima de vidro ou metal (180/240)</li>
                      <li>Lixa polidor (buffer)</li>
                      <li>Espátula para cutícula</li>
                      <li>Alicate pequeno e afiado</li>
                      <li>Separador de dedos</li>
                    </ul>
                    
                    <p><strong>💄 Produtos Indispensáveis:</strong></p>
                    <ul>
                      <li>Base fortalecedora de qualidade</li>
                      <li>Top coat secagem rápida</li>
                      <li>Óleo de cutícula (amêndoa ou jojoba)</li>
                      <li>Removedor sem acetona</li>
                      <li>Algodão e hastes flexíveis</li>
                    </ul>

                    <p><strong>🌈 Cores Versáteis:</strong></p>
                    <ul>
                      <li>Nude rosado (combina com tudo)</li>
                      <li>Vermelho clássico</li>
                      <li>Branco (para francesinha)</li>
                      <li>Preto (elegante)</li>
                      <li>Uma cor tendência da estação</li>
                    </ul>
                  </div>
                </div>

                {/* Card 6: Cuidados Especiais */}
                <div className="card">
                  <span className="card-icon">🌿</span>
                  <h3>Cuidados & Tratamentos</h3>
                  <div className="card-content">
                    <p><strong>💆‍♀️ Rotina de Cuidados:</strong></p>
                    <ul>
                      <li><strong>Manhã:</strong> Hidratante com FPS nas mãos</li>
                      <li><strong>Tarde:</strong> Óleo nas cutículas se estiver seco</li>
                      <li><strong>Noite:</strong> Creme nutritivo + massagem</li>
                      <li><strong>Semanal:</strong> Esfoliação suave nas mãos</li>
                    </ul>
                    
                    <p><strong>🏠 Receitas Caseiras:</strong></p>
                    <ul>
                      <li><strong>Fortalecedor:</strong> Azeite + limão (1x semana)</li>
                      <li><strong>Hidratação:</strong> Mel + aveia para as mãos</li>
                      <li><strong>Clareamento:</strong> Bicarbonato + água oxigenada</li>
                      <li><strong>Crescimento:</strong> Massagem com óleo de ricínio</li>
                    </ul>

                    <p><strong>⚠️ Quando Procurar Profissional:</strong></p>
                    <ul>
                      <li>Infecções ou inflamações</li>
                      <li>Unhas encravadas</li>
                      <li>Mudanças na cor ou textura</li>
                      <li>Dor persistente</li>
                      <li>Procedimentos de alongamento</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Footer */}
        <footer className="footer">
          <div className="container">
            <div className="footer-content">
              <div className="footer-section">
                <h3>Milena Rocha Nails Design</h3>
                <p>Especialista em nail design com técnicas exclusivas e produtos de alta qualidade. Transformando unhas em verdadeiras obras de arte.</p>
                
                <div className="social-links">
                  <a href="https://www.instagram.com/milenarocha.nailsdesigner/" target="_blank" rel="noopener noreferrer">
                    📷 @milenarocha.nailsdesigner
                  </a>
                </div>
              </div>
            </div>
            
            <div className="footer-bottom">
              <p>&copy; 2025 Milena Rocha Nails Design. Todos os direitos reservados.</p>
            </div>
          </div>
        </footer>
      </main>
    </>
  );
}