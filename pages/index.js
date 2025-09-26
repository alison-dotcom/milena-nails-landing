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

  const styles = {
    page: {
      margin: 0,
      padding: 0,
      fontFamily: "'Poppins', -apple-system, BlinkMacSystemFont, sans-serif",
      lineHeight: 1.6,
      color: '#2c2c2c',
      background: 'linear-gradient(135deg, #f8f2ed 0%, #ede0d4 100%)',
      minHeight: '100vh'
    },
    container: {
      maxWidth: '1200px',
      margin: '0 auto',
      padding: '0 20px'
    },
    header: {
      background: 'linear-gradient(135deg, #c19a6b 0%, #a67c00 50%, #8b6f00 100%)',
      color: 'white',
      padding: '40px 0',
      boxShadow: '0 8px 30px rgba(193, 154, 107, 0.4)',
      textAlign: 'center',
      position: 'relative'
    },
    headerOverlay: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'radial-gradient(circle at 30% 50%, rgba(255,255,255,0.15) 0%, transparent 50%)',
      pointerEvents: 'none'
    },
    logo: {
      fontFamily: "'Playfair Display', Georgia, serif",
      fontSize: '3.5rem',
      fontWeight: 900,
      marginBottom: '15px',
      textShadow: '2px 2px 8px rgba(0,0,0,0.3)',
      letterSpacing: '2px',
      position: 'relative',
      zIndex: 1
    },
    subtitle: {
      fontFamily: "'Playfair Display', Georgia, serif",
      fontSize: '1.4rem',
      opacity: 0.95,
      fontStyle: 'italic',
      letterSpacing: '1px',
      position: 'relative',
      zIndex: 1
    },
    hero: {
      background: 'linear-gradient(135deg, rgba(248, 242, 237, 0.9) 0%, rgba(237, 224, 212, 0.8) 100%)',
      padding: '120px 0',
      textAlign: 'center'
    },
    heroTitle: {
      fontFamily: "'Playfair Display', Georgia, serif",
      fontSize: '3.8rem',
      color: '#2c2c2c',
      marginBottom: '40px',
      lineHeight: 1.3,
      fontWeight: 700,
      textShadow: '1px 1px 3px rgba(0,0,0,0.1)'
    },
    heroHighlight: {
      background: 'linear-gradient(135deg, #c19a6b, #a67c00)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      backgroundClip: 'text',
      fontWeight: 900
    },
    captureSection: {
      background: 'linear-gradient(135deg, #3d3d3d 0%, #1f1f1f 100%)',
      color: 'white',
      padding: '100px 0',
      textAlign: 'center'
    },
    captureContent: {
      maxWidth: '600px',
      margin: '0 auto'
    },
    captureBadge: {
      display: 'inline-block',
      background: 'linear-gradient(135deg, #c19a6b, #a67c00)',
      color: 'white',
      padding: '15px 35px',
      borderRadius: '50px',
      fontWeight: 600,
      fontSize: '1rem',
      letterSpacing: '1px',
      marginBottom: '30px',
      textTransform: 'uppercase'
    },
    captureTitle: {
      fontFamily: "'Playfair Display', Georgia, serif",
      fontSize: '3rem',
      marginBottom: '25px',
      fontWeight: 700
    },
    captureSubtitle: {
      fontSize: '1.3rem',
      opacity: 0.9,
      marginBottom: '50px',
      lineHeight: 1.7
    },
    formContainer: {
      background: 'rgba(255, 255, 255, 0.12)',
      backdropFilter: 'blur(15px)',
      border: '1px solid rgba(255, 255, 255, 0.2)',
      borderRadius: '25px',
      padding: '50px 40px',
      boxShadow: '0 20px 40px rgba(0,0,0,0.3)'
    },
    formGroup: {
      marginBottom: '25px'
    },
    input: {
      width: '100%',
      padding: '20px 25px',
      border: 'none',
      borderRadius: '15px',
      fontSize: '1.1rem',
      background: 'rgba(255, 255, 255, 0.95)',
      color: '#2c2c2c',
      transition: 'all 0.3s ease',
      fontFamily: "'Poppins', sans-serif",
      boxShadow: '0 5px 15px rgba(0,0,0,0.1)'
    },
    inputFocus: {
      outline: 'none',
      background: 'white',
      boxShadow: '0 0 25px rgba(193, 154, 107, 0.4)',
      transform: 'translateY(-2px)'
    },
    submitBtn: {
      width: '100%',
      background: 'linear-gradient(135deg, #c19a6b, #a67c00)',
      color: 'white',
      padding: '22px 35px',
      border: 'none',
      borderRadius: '15px',
      fontSize: '1.3rem',
      fontWeight: 600,
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      textTransform: 'uppercase',
      letterSpacing: '1px',
      fontFamily: "'Poppins', sans-serif",
      boxShadow: '0 10px 30px rgba(193, 154, 107, 0.3)'
    },
    submitBtnHover: {
      transform: 'translateY(-3px)',
      boxShadow: '0 15px 40px rgba(193, 154, 107, 0.5)'
    },
    successMessage: {
      background: 'linear-gradient(135deg, #28a745, #20c997)',
      color: 'white',
      padding: '30px',
      borderRadius: '20px',
      textAlign: 'center',
      boxShadow: '0 10px 30px rgba(40, 167, 69, 0.3)'
    },
    guideSection: {
      padding: '100px 0',
      background: 'white'
    },
    sectionTitle: {
      textAlign: 'center',
      fontFamily: "'Playfair Display', Georgia, serif",
      fontSize: '3rem',
      color: '#2c2c2c',
      marginBottom: '25px',
      fontWeight: 700,
      position: 'relative'
    },
    sectionTitleAfter: {
      content: '""',
      display: 'block',
      width: '100px',
      height: '4px',
      background: 'linear-gradient(135deg, #c19a6b, #a67c00)',
      margin: '30px auto',
      borderRadius: '2px'
    },
    sectionSubtitle: {
      textAlign: 'center',
      fontSize: '1.4rem',
      color: '#666',
      marginBottom: '80px',
      fontStyle: 'italic',
      fontFamily: "'Playfair Display', Georgia, serif"
    },
    cardsGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
      gap: '40px',
      marginBottom: '60px'
    },
    card: {
      background: 'white',
      borderRadius: '25px',
      padding: '45px 35px',
      boxShadow: '0 15px 50px rgba(0,0,0,0.1)',
      border: '1px solid rgba(193, 154, 107, 0.2)',
      transition: 'all 0.4s ease',
      position: 'relative',
      overflow: 'hidden'
    },
    cardBefore: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      height: '5px',
      background: 'linear-gradient(135deg, #c19a6b, #a67c00)',
      borderRadius: '25px 25px 0 0'
    },
    cardHover: {
      transform: 'translateY(-12px)',
      boxShadow: '0 25px 60px rgba(0,0,0,0.15)'
    },
    cardIcon: {
      fontSize: '3.5rem',
      marginBottom: '25px',
      display: 'block',
      lineHeight: 1
    },
    cardTitle: {
      fontFamily: "'Playfair Display', Georgia, serif",
      fontSize: '1.9rem',
      color: '#2c2c2c',
      marginBottom: '25px',
      fontWeight: 700
    },
    cardText: {
      color: '#666',
      lineHeight: 1.8,
      marginBottom: '20px',
      fontWeight: 500
    },
    cardStrong: {
      color: '#c19a6b',
      fontWeight: 600
    },
    cardList: {
      listStyle: 'none',
      paddingLeft: 0,
      marginBottom: '25px'
    },
    cardListItem: {
      color: '#555',
      marginBottom: '12px',
      paddingLeft: '25px',
      position: 'relative',
      lineHeight: 1.6,
      fontWeight: 400
    },
    footer: {
      background: 'linear-gradient(135deg, #1f1f1f 0%, #3d3d3d 100%)',
      color: 'white',
      padding: '80px 0 40px'
    },
    footerContent: {
      textAlign: 'center',
      marginBottom: '40px'
    },
    footerTitle: {
      fontFamily: "'Playfair Display', Georgia, serif",
      color: '#c19a6b',
      marginBottom: '25px',
      fontSize: '1.9rem',
      fontWeight: 700
    },
    footerText: {
      color: '#ccc',
      marginBottom: '30px',
      lineHeight: 1.7,
      maxWidth: '600px',
      marginLeft: 'auto',
      marginRight: 'auto',
      fontSize: '1.1rem'
    },
    socialLinks: {
      display: 'flex',
      justifyContent: 'center',
      marginTop: '30px'
    },
    socialLink: {
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '15px 30px',
      background: 'linear-gradient(135deg, #c19a6b, #a67c00)',
      color: 'white',
      borderRadius: '50px',
      textDecoration: 'none',
      fontSize: '1.1rem',
      fontWeight: 600,
      transition: 'all 0.3s ease',
      letterSpacing: '1px'
    },
    socialLinkHover: {
      transform: 'translateY(-3px)',
      boxShadow: '0 10px 30px rgba(193, 154, 107, 0.4)'
    },
    footerBottom: {
      textAlign: 'center',
      paddingTop: '40px',
      borderTop: '1px solid #555',
      color: '#999',
      fontSize: '0.95rem'
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
      </Head>

      <div style={styles.page}>
        {/* Header */}
        <header style={styles.header}>
          <div style={styles.headerOverlay}></div>
          <div style={styles.container}>
            <h1 style={styles.logo}>Milena Rocha Nails Design</h1>
            <p style={styles.subtitle}>Arte e cuidado com suas unhas em cada detalhe</p>
          </div>
        </header>

        {/* Hero Section */}
        <section style={styles.hero}>
          <div style={styles.container}>
            <h1 style={styles.heroTitle}>
              Descubra os segredos para <span style={styles.heroHighlight}>unhas perfeitas</span> em acrílico, gel e esmaltação que <span style={styles.heroHighlight}>duram mais</span>
            </h1>
          </div>
        </section>

        {/* Formulário de Captura */}
        <section style={styles.captureSection}>
          <div style={styles.container}>
            <div style={styles.captureContent}>
              <span style={styles.captureBadge}>💅 Acesso Gratuito</span>
              <h2 style={styles.captureTitle}>Receba o Guia Completo Agora</h2>
              <p style={styles.captureSubtitle}>
                Aprenda técnicas profissionais e segredos para unhas perfeitas.<br />
                <strong>100% Gratuito • Acesso Imediato</strong>
              </p>
              
              {!showSuccess && !showGuide && (
                <div style={styles.formContainer}>
                  <form onSubmit={handleSubmit}>
                    <div style={styles.formGroup}>
                      <input
                        type="text"
                        name="nome"
                        placeholder="Seu nome completo"
                        value={formData.nome}
                        onChange={handleInputChange}
                        required
                        style={styles.input}
                      />
                    </div>
                    
                    <div style={styles.formGroup}>
                      <input
                        type="tel"
                        name="telefone"
                        placeholder="(11) 99999-9999"
                        value={formData.telefone}
                        onChange={handleInputChange}
                        required
                        style={styles.input}
                      />
                    </div>
                    
                    <button 
                      type="submit" 
                      disabled={isLoading}
                      style={styles.submitBtn}
                    >
                      {isLoading ? '⏳ Enviando...' : '💅 Quero o Guia Gratuito'}
                    </button>
                  </form>
                </div>
              )}

              {showSuccess && (
                <div style={styles.successMessage}>
                  <h3 style={{fontSize: '1.5rem', marginBottom: '10px'}}>🎉 Sucesso!</h3>
                  <p>Dados salvos! Carregando seu guia exclusivo...</p>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Guia Completo */}
        {showGuide && (
          <section style={styles.guideSection}>
            <div style={styles.container}>
              <h2 style={styles.sectionTitle}>🎁 Seu Guia Completo de Unhas</h2>
              <div style={styles.sectionTitleAfter}></div>
              <p style={styles.sectionSubtitle}>Parabéns! Aqui estão todas as técnicas profissionais</p>
              
              <div style={styles.cardsGrid}>
                {/* Card 1 */}
                <div style={styles.card}>
                  <div style={styles.cardBefore}></div>
                  <span style={styles.cardIcon}>💅</span>
                  <h3 style={styles.cardTitle}>Unhas em Acrílico</h3>
                  <div>
                    <p style={styles.cardText}><strong style={styles.cardStrong}>🏆 Vantagens do Acrílico:</strong></p>
                    <ul style={styles.cardList}>
                      <li style={styles.cardListItem}>💅 Resistência superior - ideal para quem trabalha muito com as mãos</li>
                      <li style={styles.cardListItem}>💅 Durabilidade de 3-4 semanas sem descascar</li>
                      <li style={styles.cardListItem}>💅 Perfeito para alongamentos e formatos estruturados</li>
                      <li style={styles.cardListItem}>💅 Base ideal para nail arts elaboradas e 3D</li>
                      <li style={styles.cardListItem}>💅 Secagem rápida ao ar livre</li>
                    </ul>
                    
                    <p style={styles.cardText}><strong style={styles.cardStrong}>🔧 Cuidados Essenciais:</strong></p>
                    <ul style={styles.cardList}>
                      <li style={styles.cardListItem}>💅 Use sempre luvas para limpeza pesada e jardinagem</li>
                      <li style={styles.cardListItem}>💅 Hidrate cutículas diariamente com óleo específico</li>
                      <li style={styles.cardListItem}>💅 NUNCA use as unhas como ferramentas (abrir latas, etc.)</li>
                      <li style={styles.cardListItem}>💅 Faça manutenção a cada 15-20 dias</li>
                      <li style={styles.cardListItem}>💅 Remova apenas com profissional para evitar danos</li>
                    </ul>

                    <p style={styles.cardText}><strong style={styles.cardStrong}>💡 Dica Profissional:</strong></p>
                    <p style={styles.cardText}>Aplique uma gotinha de óleo de cutícula na lateral das unhas antes de dormir. Isso mantém a flexibilidade e evita rachaduras.</p>
                  </div>
                </div>

                {/* Card 2 */}
                <div style={styles.card}>
                  <div style={styles.cardBefore}></div>
                  <span style={styles.cardIcon}>💎</span>
                  <h3 style={styles.cardTitle}>Alongamento em Gel</h3>
                  <div>
                    <p style={styles.cardText}><strong style={styles.cardStrong}>✨ Quando Escolher Gel:</strong></p>
                    <ul style={styles.cardList}>
                      <li style={styles.cardListItem}>💅 Visual mais natural e movimento flexível</li>
                      <li style={styles.cardListItem}>💅 Menos agressivo à unha natural</li>
                      <li style={styles.cardListItem}>💅 Secagem instantânea com cabine LED/UV</li>
                      <li style={styles.cardListItem}>💅 Ideal para unhas sensíveis ou danificadas</li>
                      <li style={styles.cardListItem}>💅 Acabamento brilhante duradouro</li>
                    </ul>
                    
                    <p style={styles.cardText}><strong style={styles.cardStrong}>🛠️ Manutenção Correta:</strong></p>
                    <ul style={styles.cardList}>
                      <li style={styles.cardListItem}>💅 Retoque profissional a cada 2-3 semanas</li>
                      <li style={styles.cardListItem}>💅 Use base fortalecedora entre aplicações</li>
                      <li style={styles.cardListItem}>💅 Evite produtos com acetona pura</li>
                      <li style={styles.cardListItem}>💅 Proteja do ressecamento com cremes específicos</li>
                      <li style={styles.cardListItem}>💅 Remoção sempre profissional com lixamento suave</li>
                    </ul>

                    <p style={styles.cardText}><strong style={styles.cardStrong}>⚠️ Cuidado Especial:</strong></p>
                    <p style={styles.cardText}>Se notar descolamento nas bordas, procure um profissional imediatamente. Não puxe ou force a remoção!</p>
                  </div>
                </div>

                {/* Card 3 */}
                <div style={styles.card}>
                  <div style={styles.cardBefore}></div>
                  <span style={styles.cardIcon}>🌟</span>
                  <h3 style={styles.cardTitle}>Esmaltação Profissional</h3>
                  <div>
                    <p style={styles.cardText}><strong style={styles.cardStrong}>🎯 Preparação Perfeita:</strong></p>
                    <ul style={styles.cardList}>
                      <li style={styles.cardListItem}>💅 Retire completamente esmalte anterior com algodão</li>
                      <li style={styles.cardListItem}>💅 Empurre cutículas com espátula após amolecimento</li>
                      <li style={styles.cardListItem}>💅 Lima no formato desejado com movimentos unidirecionais</li>
                      <li style={styles.cardListItem}>💅 Desengordue com álcool 70% ou primer</li>
                      <li style={styles.cardListItem}>💅 Aplique base específica para seu tipo de unha</li>
                    </ul>
                    
                    <p style={styles.cardText}><strong style={styles.cardStrong}>🎨 Técnica de Aplicação:</strong></p>
                    <ul style={styles.cardList}>
                      <li style={styles.cardListItem}>💅 Camadas finas e uniformes (3 pinceladas máximo)</li>
                      <li style={styles.cardListItem}>💅 Comece pelo meio, depois laterais</li>
                      <li style={styles.cardListItem}>💅 Deixe secar completamente entre camadas (2-3 min)</li>
                      <li style={styles.cardListItem}>💅 2 camadas de cor + base + top coat</li>
                      <li style={styles.cardListItem}>💅 Finalize com óleo de cutícula</li>
                    </ul>

                    <p style={styles.cardText}><strong style={styles.cardStrong}>🔒 Segredos para Durar 7+ Dias:</strong></p>
                    <ul style={styles.cardList}>
                      <li style={styles.cardListItem}>💅 Evite água muito quente nas primeiras 4 horas</li>
                      <li style={styles.cardListItem}>💅 Use luvas para lavar louça e produtos químicos</li>
                      <li style={styles.cardListItem}>💅 Reaplique top coat a cada 2-3 dias</li>
                      <li style={styles.cardListItem}>💅 Hidrate cutículas diariamente</li>
                      <li style={styles.cardListItem}>💅 Faça movimentos suaves ao abrir coisas</li>
                    </ul>
                  </div>
                </div>

                {/* Card 4 */}
                <div style={styles.card}>
                  <div style={styles.cardBefore}></div>
                  <span style={styles.cardIcon}>🔧</span>
                  <h3 style={styles.cardTitle}>Soluções para Problemas</h3>
                  <div>
                    <p style={styles.cardText}><strong style={styles.cardStrong}>🚨 Problemas Comuns & Soluções:</strong></p>
                    
                    <p style={styles.cardText}><strong>Esmalte descascando rápido:</strong></p>
                    <ul style={styles.cardList}>
                      <li style={styles.cardListItem}>💅 Use sempre base + 2 camadas + top coat</li>
                      <li style={styles.cardListItem}>💅 Desengordue bem antes da aplicação</li>
                      <li style={styles.cardListItem}>💅 Evite cremes nas mãos antes de esmaltar</li>
                    </ul>

                    <p style={styles.cardText}><strong>Bolhas no esmalte:</strong></p>
                    <ul style={styles.cardList}>
                      <li style={styles.cardListItem}>💅 Aplique camadas mais finas</li>
                      <li style={styles.cardListItem}>💅 Deixe secar mais tempo entre camadas</li>
                      <li style={styles.cardListItem}>💅 Evite balançar o frasco (gira entre as palmas)</li>
                    </ul>

                    <p style={styles.cardText}><strong>Cutículas ressecadas:</strong></p>
                    <ul style={styles.cardList}>
                      <li style={styles.cardListItem}>💅 Óleo de cutícula 2x ao dia</li>
                      <li style={styles.cardListItem}>💅 Hidratante específico para mãos</li>
                      <li style={styles.cardListItem}>💅 Evite retirar cutículas secas</li>
                    </ul>

                    <p style={styles.cardText}><strong>Unha quebradiça:</strong></p>
                    <ul style={styles.cardList}>
                      <li style={styles.cardListItem}>💅 Base fortalecedora 3x por semana</li>
                      <li style={styles.cardListItem}>💅 Suplemento de biotina</li>
                      <li style={styles.cardListItem}>💅 Evite lixas muito grossas</li>
                    </ul>
                  </div>
                </div>

                {/* Card 5 */}
                <div style={styles.card}>
                  <div style={styles.cardBefore}></div>
                  <span style={styles.cardIcon}>🎁</span>
                  <h3 style={styles.cardTitle}>Kit Essencial para Casa</h3>
                  <div>
                    <p style={styles.cardText}><strong style={styles.cardStrong}>🧰 Ferramentas Básicas:</strong></p>
                    <ul style={styles.cardList}>
                      <li style={styles.cardListItem}>💅 Lima de vidro ou metal (180/240)</li>
                      <li style={styles.cardListItem}>💅 Lixa polidor (buffer)</li>
                      <li style={styles.cardListItem}>💅 Espátula para cutícula</li>
                      <li style={styles.cardListItem}>💅 Alicate pequeno e afiado</li>
                      <li style={styles.cardListItem}>💅 Separador de dedos</li>
                    </ul>
                    
                    <p style={styles.cardText}><strong style={styles.cardStrong}>💄 Produtos Indispensáveis:</strong></p>
                    <ul style={styles.cardList}>
                      <li style={styles.cardListItem}>💅 Base fortalecedora de qualidade</li>
                      <li style={styles.cardListItem}>💅 Top coat secagem rápida</li>
                      <li style={styles.cardListItem}>💅 Óleo de cutícula (amêndoa ou jojoba)</li>
                      <li style={styles.cardListItem}>💅 Removedor sem acetona</li>
                      <li style={styles.cardListItem}>💅 Algodão e hastes flexíveis</li>
                    </ul>

                    <p style={styles.cardText}><strong style={styles.cardStrong}>🌈 Cores Versáteis:</strong></p>
                    <ul style={styles.cardList}>
                      <li style={styles.cardListItem}>💅 Nude rosado (combina com tudo)</li>
                      <li style={styles.cardListItem}>💅 Vermelho clássico</li>
                      <li style={styles.cardListItem}>💅 Branco (para francesinha)</li>
                      <li style={styles.cardListItem}>💅 Preto (elegante)</li>
                      <li style={styles.cardListItem}>💅 Uma cor tendência da estação</li>
                    </ul>
                  </div>
                </div>

                {/* Card 6 */}
                <div style={styles.card}>
                  <div style={styles.cardBefore}></div>
                  <span style={styles.cardIcon}>🌿</span>
                  <h3 style={styles.cardTitle}>Cuidados & Tratamentos</h3>
                  <div>
                    <p style={styles.cardText}><strong style={styles.cardStrong}>💆‍♀️ Rotina de Cuidados:</strong></p>
                    <ul style={styles.cardList}>
                      <li style={styles.cardListItem}>💅 <strong>Manhã:</strong> Hidratante com FPS nas mãos</li>
                      <li style={styles.cardListItem}>💅 <strong>Tarde:</strong> Óleo nas cutículas se estiver seco</li>
                      <li style={styles.cardListItem}>💅 <strong>Noite:</strong> Creme nutritivo + massagem</li>
                      <li style={styles.cardListItem}>💅 <strong>Semanal:</strong> Esfoliação suave nas mãos</li>
                    </ul>
                    
                    <p style={styles.cardText}><strong style={styles.cardStrong}>🏠 Receitas Caseiras:</strong></p>
                    <ul style={styles.cardList}>
                      <li style={styles.cardListItem}>💅 <strong>Fortalecedor:</strong> Azeite + limão (1x semana)</li>
                      <li style={styles.cardListItem}>💅 <strong>Hidratação:</strong> Mel + aveia para as mãos</li>
                      <li style={styles.cardListItem}>💅 <strong>Clareamento:</strong> Bicarbonato + água oxigenada</li>
                      <li style={styles.cardListItem}>💅 <strong>Crescimento:</strong> Massagem com óleo de ricínio</li>
                    </ul>

                    <p style={styles.cardText}><strong style={styles.cardStrong}>⚠️ Quando Procurar Profissional:</strong></p>
                    <ul style={styles.cardList}>
                      <li style={styles.cardListItem}>💅 Infecções ou inflamações</li>
                      <li style={styles.cardListItem}>💅 Unhas encravadas</li>
                      <li style={styles.cardListItem}>💅 Mudanças na cor ou textura</li>
                      <li style={styles.cardListItem}>💅 Dor persistente</li>
                      <li style={styles.cardListItem}>💅 Procedimentos de alongamento</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Footer */}
        <footer style={styles.footer}>
          <div style={styles.container}>
            <div style={styles.footerContent}>
              <h3 style={styles.footerTitle}>Milena Rocha Nails Design</h3>
              <p style={styles.footerText}>Especialista em nail design com técnicas exclusivas e produtos de alta qualidade. Transformando unhas em verdadeiras obras de arte.</p>
              
              <div style={styles.socialLinks}>
                <a 
                  href="https://www.instagram.com/milenarocha.nailsdesigner/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  style={styles.socialLink}
                >
                  📷 @milenarocha.nailsdesigner
                </a>
              </div>
            </div>
            
            <div style={styles.footerBottom}>
              <p>&copy; 2025 Milena Rocha Nails Design. Todos os direitos reservados.</p>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}