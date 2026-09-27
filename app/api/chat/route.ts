import { NextRequest, NextResponse } from 'next/server'

// Full resume knowledge base for Siddharth Singh
const SYSTEM_KNOWLEDGE = `
You are "Sid's AI Portfolio Assistant", an articulate, friendly, and professional AI representing Siddharth Singh (Sid).
Your purpose is to answer questions from recruiters, engineering managers, and visitors about Siddharth's background, skills, career trajectory, and projects.

=== SIDDHARTH SINGH'S PROFILE ===
- Full Name: Siddharth Singh
- Current Role: Senior Software Engineer at Under Armour (Bengaluru, India)
- Previous Role: Team Lead at Codilar Technologies (March 15, 2021 — August 14, 2026 · 5 yrs 5 mos)
- Location: Bengaluru, Karnataka, India
- Email: vishensiddharth@gmail.com
- Phone: +91 91622 18895
- GitHub: https://github.com/vishensiddharth
- LinkedIn: https://www.linkedin.com/in/siddharth-singh-12360315a/

=== CURRENT ROLE: UNDER ARMOUR (Aug 17, 2026 — Present) ===
- Position: Senior Software Engineer (Full-time)
- Focus: High-performance e-commerce storefronts using Salesforce Commerce Cloud (SFCC).
- Front-End: Modern, responsive storefronts with Next.js, React, and TypeScript with SSR/SSG and Core Web Vitals optimization.
- APIs & Backend: Designing and consuming GraphQL APIs for dynamic PDPs, cart, checkout, and personalization; scalable Node.js services and middleware.
- Integrations: Third-party payment gateways, real-time inventory systems, and customer loyalty platforms.
- Agile: Sprint planning, code reviews, and continuous delivery pipelines.

=== PREVIOUS ROLE: CODILAR TECHNOLOGIES (Mar 15, 2021 — Aug 14, 2026) ===
- Position: Team Lead (Full-time · 5 years 5 months)
- Leadership: Led cross-functional teams building mobile apps (React Native) and modern web applications (React.js, Next.js) for international enterprise e-commerce clients.
- Flagship Projects:
  1. LuLu Online: GCC's largest grocery & retail platform on Akinon serving millions of users with real-time inventory and high-performance checkout.
  2. Ajmal Perfumes: Luxury fragrance omnichannel experience on Magento Cloud + Next.js + React Native mobile app.
  3. Ooka: Next-generation retail web and mobile app on Magento Cloud with headless Next.js frontend and React Native.
  4. Wingreens Farms: Offline-first Progressive Web App (PWA) with React.js and Redux, optimizing load performance.
- Architecture: CI/CD automation with GitHub Actions & Bitbucket Pipelines, bundle size reduction (up to 40% speed improvement), code reviews, and developer mentoring.

=== EDUCATION ===
- Degree: Bachelor of Technology (B.Tech) in Electronics and Communication Engineering
- Institution: Bundelkhand Institute of Engineering & Technology (B.I.E.T.), Jhansi, Uttar Pradesh
- Duration: 2016 — 2020
- Aggregate: 73.6%

=== CORE TECH ARSENAL ===
- Mobile: React Native (Expert, 95% proficiency)
- Web Frontend: Next.js (92%), React.js (94%), TypeScript (88%), Redux (87%), Tailwind CSS, GSAP, Framer Motion
- Backend & APIs: Node.js (85%), GraphQL (82%), REST APIs, Express
- Enterprise Commerce: Salesforce Commerce Cloud (SFCC - 75%), Magento Cloud, Akinon, PWA
- DevOps & Tools: Git, GitHub Actions, Bitbucket Pipelines, Docker, CI/CD

=== INSTRUCTIONS FOR RESPONDING ===
- Answer clearly, concisely, and warmly.
- Keep responses focused (typically 2-4 sentences or short bullet points).
- If asked about hiring or contacting Sid, provide his email (vishensiddharth@gmail.com) and phone (+91 91622 18895).
- If asked about something not in his background, politely mention what he specializes in instead.
`

export async function POST(req: NextRequest) {
  try {
    const { messages } = await req.json()

    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json({ error: 'Invalid messages array' }, { status: 400 })
    }

    const lastUserMessage = messages[messages.length - 1]?.content || ''
    const apiKey = process.env.GEMINI_API_KEY

    // If Gemini API key is available, call Google Gemini 1.5 Flash
    if (apiKey) {
      try {
        const geminiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`

        const contents = [
          {
            role: 'user',
            parts: [{ text: `${SYSTEM_KNOWLEDGE}\n\nVisitor Question: ${lastUserMessage}` }],
          },
        ]

        const response = await fetch(geminiUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents,
            generationConfig: {
              temperature: 0.7,
              maxOutputTokens: 300,
            },
          }),
        })

        if (response.ok) {
          const data = await response.json()
          const reply = data.candidates?.[0]?.content?.parts?.[0]?.text
          if (reply) {
            return NextResponse.json({ reply })
          }
        }
      } catch (geminiError) {
        console.warn('Gemini API call failed, falling back to local knowledge engine:', geminiError)
      }
    }

    // Smart Local Knowledge Engine (fallback when no API key or offline)
    const localReply = generateLocalKnowledgeReply(lastUserMessage)
    return NextResponse.json({ reply: localReply })
  } catch (error) {
    console.error('Error in chat API:', error)
    return NextResponse.json(
      { reply: "I'm having a momentary connection glitch. Feel free to reach Siddharth directly at vishensiddharth@gmail.com!" },
      { status: 500 }
    )
  }
}

function generateLocalKnowledgeReply(query: string): string {
  const q = query.toLowerCase()

  if (q.includes('under armour') || q.includes('current') || q.includes('present') || q.includes('now')) {
    return "Siddharth is currently a Senior Software Engineer at Under Armour (starting August 2026). He works on enterprise e-commerce storefronts using Salesforce Commerce Cloud (SFCC), building modern Next.js interfaces, designing GraphQL APIs, and engineering scalable Node.js microservices."
  }

  if (q.includes('codilar') || q.includes('team lead') || q.includes('past')) {
    return "At Codilar Technologies, Siddharth spent over 5 years (March 2021 – August 2026) as Team Lead. He architected major enterprise solutions including LuLu Online on Akinon (serving millions across the GCC), omnichannel platforms for Ajmal Perfumes and Ooka on Magento Cloud + Next.js, and Wingreens PWA."
  }

  if (q.includes('project') || q.includes('build') || q.includes('lulu') || q.includes('ajmal') || q.includes('ooka') || q.includes('wingreens')) {
    return "Some of Sid's key flagship projects include:\n• LuLu Online: Millions of GCC users, Akinon + React Native with real-time inventory.\n• Ajmal Perfumes & Ooka: Luxury omnichannel platforms on Magento Cloud, Next.js, and React Native.\n• Wingreens Farms: Offline-first Progressive Web App (PWA) with React.js and Redux."
  }

  if (q.includes('skill') || q.includes('stack') || q.includes('tech') || q.includes('react') || q.includes('next') || q.includes('graphql')) {
    return "Siddharth's core tech arsenal centers around React Native (95%), React.js (94%), Next.js (92%), TypeScript (88%), Node.js (85%), and GraphQL (82%), alongside enterprise commerce platforms like SFCC, Magento Cloud, and Akinon."
  }

  if (q.includes('contact') || q.includes('email') || q.includes('phone') || q.includes('hire') || q.includes('reach')) {
    return "You can reach Siddharth directly via:\n📧 Email: vishensiddharth@gmail.com\n📱 Phone: +91 91622 18895\n💼 LinkedIn: linkedin.com/in/siddharth-singh-12360315a\n🐙 GitHub: github.com/vishensiddharth"
  }

  if (q.includes('education') || q.includes('college') || q.includes('degree') || q.includes('biet')) {
    return "Siddharth graduated with a B.Tech in Electronics and Communication Engineering from Bundelkhand Institute of Engineering & Technology (B.I.E.T.), Jhansi (Batch of 2016–2020) with a 73.6% aggregate."
  }

  if (q.includes('experience') || q.includes('years') || q.includes('how long')) {
    return "Siddharth has 5.5+ years of extensive professional engineering experience, starting in March 2021 at Codilar Technologies (progressing to Team Lead) and now serving as Senior Software Engineer at Under Armour."
  }

  return "Siddharth Singh is a Senior Software Engineer at Under Armour and former Team Lead at Codilar Technologies, specializing in React Native, Next.js, GraphQL, Node.js, and high-performance commerce platforms. What specific aspect of his work would you like to explore?"
}
