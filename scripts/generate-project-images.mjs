/**
 * generate-project-images.mjs
 * ─────────────────────────────────────────────────────────────────────────────
 * Uses Gemini 2.0 Flash (image generation) to create placeholder project
 * screenshots for projects that don't have real images yet.
 *
 * Setup:
 *   1. Add GEMINI_API_KEY=your_key_here to .env.local
 *   2. Run: node scripts/generate-project-images.mjs
 *
 * Get a free API key at: https://aistudio.google.com/app/apikey
 * ─────────────────────────────────────────────────────────────────────────────
 */

import { GoogleGenerativeAI } from '@google/generative-ai';
import { writeFileSync, mkdirSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { readFileSync } from 'fs';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');
const OUTPUT_DIR = join(ROOT, 'public', 'images', 'projects');

// ── Load env ─────────────────────────────────────────────────────────────────
function loadEnv() {
  const envPath = join(ROOT, '.env.local');
  if (!existsSync(envPath)) return {};
  const raw = readFileSync(envPath, 'utf-8');
  return Object.fromEntries(
    raw.split('\n')
      .filter((l) => l.includes('=') && !l.startsWith('#'))
      .map((l) => l.split('=').map((s) => s.trim()))
  );
}

const env = loadEnv();
const API_KEY = env.GEMINI_API_KEY || process.env.GEMINI_API_KEY;

if (!API_KEY) {
  console.error('\n❌  GEMINI_API_KEY not found.\n');
  console.error('   Add this to your .env.local:');
  console.error('   GEMINI_API_KEY=your_key_here\n');
  console.error('   Get a free key at: https://aistudio.google.com/app/apikey\n');
  process.exit(1);
}

// ── Projects to generate ──────────────────────────────────────────────────────
const PROJECTS = [
  {
    filename: 'sbisecurities.jpg',
    prompt:
      'Professional financial web application UI screenshot for SBI Securities, a government stock trading platform. Blue and white color scheme, financial charts, portfolio tables, clean government-style design, navbar with logo. Wide 16:9 desktop layout, high fidelity.',
  },
  {
    filename: 'motilaloswal.jpg',
    prompt:
      'Professional financial web application UI screenshot for Motilal Oswal, a stock broking and wealth management website. Orange and white brand colors, financial products grid, hero banner, mutual funds section, clean modern design. Wide 16:9 desktop layout.',
  },
  {
    filename: 'athletescloud.jpg',
    prompt:
      'Professional web application UI screenshot for AthletesCloud, a sports mentorship platform. Dark themed athlete dashboard with profile cards, scheduling calendar, mentor connections, clean modern cards and typography. Wide 16:9 desktop layout, high-fidelity.',
  },
  {
    filename: 'easytutor.jpg',
    prompt:
      'Professional web application UI screenshot for EasyTutor, an online tutoring platform. Clean light-themed interface with student learning dashboard, video session screen, course progress charts, scheduling calendar. Wide 16:9 desktop layout.',
  },
];

// ── Generate ──────────────────────────────────────────────────────────────────
const genAI = new GoogleGenerativeAI(API_KEY);

async function generateImage(project) {
  console.log(`\n⏳  Generating: ${project.filename}`);

  const model = genAI.getGenerativeModel({
    model: 'gemini-2.0-flash-preview-image-generation',
  });

  const result = await model.generateContent({
    contents: [
      {
        role: 'user',
        parts: [{ text: project.prompt }],
      },
    ],
    generationConfig: {
      responseModalities: ['image'],
    },
  });

  const response = result.response;
  const parts = response.candidates?.[0]?.content?.parts ?? [];

  for (const part of parts) {
    if (part.inlineData?.mimeType?.startsWith('image/')) {
      const buffer = Buffer.from(part.inlineData.data, 'base64');
      const outputPath = join(OUTPUT_DIR, project.filename);
      writeFileSync(outputPath, buffer);
      console.log(`✅  Saved: public/images/projects/${project.filename}`);
      return;
    }
  }

  console.warn(`⚠️  No image returned for ${project.filename}`);
}

async function main() {
  console.log('🎨  Gemini Project Image Generator');
  console.log('────────────────────────────────────');

  // Create output directory if needed
  if (!existsSync(OUTPUT_DIR)) {
    mkdirSync(OUTPUT_DIR, { recursive: true });
    console.log(`📁  Created: public/images/projects/`);
  }

  for (const project of PROJECTS) {
    const outputPath = join(OUTPUT_DIR, project.filename);
    if (existsSync(outputPath)) {
      console.log(`⏭️  Skipping (exists): ${project.filename}`);
      continue;
    }

    try {
      await generateImage(project);
      // Small delay between requests to avoid rate limits
      await new Promise((r) => setTimeout(r, 2000));
    } catch (err) {
      console.error(`❌  Failed for ${project.filename}:`, err.message);
    }
  }

  console.log('\n✨  Done!\n');
}

main();
