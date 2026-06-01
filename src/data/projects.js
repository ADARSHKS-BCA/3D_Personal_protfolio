// src/data/projects.js
export const projects = [
  {
    title: 'CloudSync Dashboard',
    desc: 'A real-time cloud infrastructure monitoring dashboard built with React and WebSocket connections. Features live metrics visualization, automated alerting systems, and multi-region deployment status tracking with sub-second latency updates.',
    tech: ['React', 'Node.js', 'WebSocket'],
    category: 'Full Stack',
    liveUrl: 'https://cloudsync-demo.vercel.app',
    githubUrl: 'https://github.com/adarsh-ks/cloudsync-dashboard',
    image: '/projects/cloudsync.webp',
  },
  {
    title: 'NeuralCanvas AI',
    desc: 'An AI-powered creative platform that transforms text prompts into stunning digital artwork. Built with a Python backend serving a fine-tuned diffusion model, React frontend with real-time generation preview, and gallery sharing features.',
    tech: ['Python', 'React', 'MongoDB'],
    category: 'AI / ML',
    liveUrl: 'https://neuralcanvas-demo.vercel.app',
    githubUrl: 'https://github.com/adarsh-ks/neuralcanvas',
    image: '/projects/neuralcanvas.webp',
  },
  {
    title: 'DevFlow CI/CD',
    desc: 'A lightweight continuous integration pipeline tool designed for small teams. Supports GitHub webhook integration, Docker-based build environments, parallel test execution, and Slack notifications with detailed build reports.',
    tech: ['Docker', 'Node.js', 'React'],
    category: 'DevOps',
    liveUrl: 'https://devflow-demo.vercel.app',
    githubUrl: 'https://github.com/adarsh-ks/devflow',
    image: '/projects/devflow.webp',
  },
];
