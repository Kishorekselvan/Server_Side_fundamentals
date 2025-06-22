export const concepts = [
  {
    id: 'ssr',
    title: 'Server-Side Rendering (SSR)',
    description:'Server-side handles backend logic and data processing on the web server',
    details: `
Server-Side Rendering (SSR) is the process where web pages are rendered on the server instead of in the browser. 
When a request is made, the server processes the HTML and sends a fully rendered page to the client. 
This contrasts with Client-Side Rendering (CSR), where a blank HTML shell is sent, and JavaScript renders the content in the browser.

SSR is commonly used in frameworks like Next.js or Express.js with templating engines like EJS, Pug, or even React (via renderToString).
SSR helps improve performance for users on slower networks and devices, and also ensures that search engine crawlers can index the page content.
    `,
    code: `import express from 'express';
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import App from './App';

const app = express();

app.get('*', (req, res) => {
  const html = ReactDOMServer.renderToString(<App />);
  res.send(\`
    <!DOCTYPE html>
    <html>
      <head><title>SSR Example</title></head>
      <body>
        <div id="root">\${html}</div>
        <script src="/client.bundle.js"></script>
      </body>
    </html>
  \`);
});

app.listen(3000, () => console.log('Server running on http://localhost:3000'));
`,
    tags: ['react', 'seo', 'performance', 'next.js', 'rendering'],
    useCases: [
      'Improved SEO for blogs and marketing websites',
      'Faster initial page load for e-commerce landing pages',
      'Pre-rendered content for better accessibility and sharing on social platforms'
    ],
    resources: [
      { label: 'MDN – Server-side rendering', url: 'https://developer.mozilla.org/en-US/docs/Glossary/Server-side_rendering' },
      { label: 'Next.js Documentation', url: 'https://nextjs.org/docs' },
      { label: 'React Docs – renderToString', url: 'https://reactjs.org/docs/react-dom-server.html' },
      { label: 'YouTube – SSR vs CSR', url: 'https://www.youtube.com/watch?v=6vIrb2rzC5I' }
    ],
    quiz: {
      q: 'What is a primary advantage of SSR over CSR?',
      a: [
        'Faster client-side routing',
        'Better SEO and initial load time',
        'Reduced backend load',
        'Eliminates JavaScript completely'
      ],
      correct: 1,
      explanation: 'SSR sends a fully rendered HTML page from the server, which is better for search engines and page speed.'
    },
    
  },
{
    id: 'restful-apis',
    title: 'RESTful APIs',
    description:'Provides a standardized way to access and manipulate server resources using HTTP methods.',
    details: `
A REST API (Representational State Transfer) is a web-based architectural style that allows applications to communicate over HTTP by exposing resources (like users, products, etc.) through uniform, stateless endpoints. It uses standard HTTP methods—GET to retrieve data, POST to create, PUT to update, and DELETE to remove—making it simple, scalable, and language-agnostic. REST APIs are widely used in modern web and mobile applications for their flexibility, readability, and compatibility with tools like Postman. They're commonly secured using HTTPS, API keys, or tokens like JWT, and power everything from e-commerce platforms to cloud services.
    `,
    code: `// Node.js + Express example
import express from 'express';
const app = express();
app.use(express.json());

let items = [{ id: 1, name: 'Item One' }];

app.get('/api/items', (req, res) => {
  res.json(items);
});

app.post('/api/items', (req, res) => {
  const newItem = { id: Date.now(), ...req.body };
  items.push(newItem);
  res.status(201).json(newItem);
});

app.put('/api/items/:id', (req, res) => {
  const index = items.findIndex(i => i.id === parseInt(req.params.id));
  if (index > -1) items[index] = { id: items[index].id, ...req.body };
  res.json(items[index]);
});

app.delete('/api/items/:id', (req, res) => {
  items = items.filter(i => i.id !== parseInt(req.params.id));
  res.sendStatus(204);
});

app.listen(3000, () => console.log('REST API running on http://localhost:3000'));
`,
    tags: ['http', 'crud', 'api', 'architecture'],
    useCases: [
      'Mobile & web apps for data sync',
      'Microservices communication',
      'Cloud services management (e.g. AWS/Azure APIs)',
      'Third-party integrations like payment gateways'
    ],
    resources: [
      { label: 'Postman – What Is a REST API?', url: 'https://blog.postman.com/rest-api-examples/' },
      { label: 'MDN – REST APIs', url: 'https://developer.mozilla.org/en-US/docs/Glossary/REST' },
      { label: 'Oxylabs – REST API Design Guide', url: 'https://oxylabs.io/blog/rest-api' }
    ],
    quiz: {
      q: 'Which HTTP method is used to update an existing resource?',
      a: ['GET', 'POST', 'PUT', 'DELETE'],
      correct: 2,
      explanation: 'PUT is typically used to update an existing resource in RESTful APIs.'
    }
  },
  {
  id: 'auth',
  title: 'Authentication & Authorization',
  description:'Verifies a users identity using credentials like passwords or tokens.Determines what actions or resources an authenticated user is allowed to access',
  details: `
Authentication is the process of verifying a user's identity before granting access to a system or application. It ensures that the person or system requesting access is who they claim to be, typically by checking credentials such as usernames and passwords. More secure methods can include biometric data (like fingerprints), one-time passwords (OTP), or tokens (such as JWTs or OAuth tokens). Without authentication, systems cannot determine who is making a request, making it a critical first step in securing digital services.Authorization is the process of determining what an authenticated user is allowed to do within a system. Once a user’s identity has been verified through authentication, authorization defines their access level—such as viewing data, editing records, or accessing admin features. It often uses roles (like user, moderator, admin) or permissions (read, write, delete) to enforce rules. For example, while both a user and an admin might be authenticated, only the admin may be authorized to delete content.
Authorization is the process of determining what an authenticated user is allowed to do within a system. Once a user’s identity has been verified through authentication, authorization defines their access level—such as viewing data, editing records, or accessing admin features. It often uses roles (like user, moderator, admin) or permissions (read, write, delete) to enforce rules. For example, while both a user and an admin might be authenticated, only the admin may be authorized to delete content.`,
  code: `// Express + JWT example
import express from 'express';
import jwt from 'jsonwebtoken';
const app = express();
app.use(express.json());
const SECRET = 'supersecret';

// Authentication: login route
app.post('/login', (req, res) => {
  const { username, password } = req.body;
  if (username === 'admin' && password === 'pass') {
    const token = jwt.sign({ user: username, role: 'admin' }, SECRET, { expiresIn: '1h' });
    return res.json({ token });
  }
  res.status(401).json({ message: 'Invalid credentials' });
});

// Authorization middleware
const authorize = (roles) => (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  try {
    const payload = jwt.verify(token, SECRET);
    if (roles.includes(payload.role)) {
      req.user = payload;
      return next();
    }
    res.sendStatus(403);
  } catch {
    res.sendStatus(401);
  }
};

app.get('/admin', authorize(['admin']), (req, res) => {
  res.send('Welcome admin');
});

app.listen(3000);`,
  tags: ['security', 'jwt', 'oauth', 'roles'],
  useCases: [
    'Protect API endpoints based on user roles',
    'Secure login systems using passwords + MFA',
    'Single Sign-On (SSO) across multiple apps',
    'Scope-based access in OAuth (e.g. "read:profile")'
  ],
  resources: [
    {
      label: 'IBM – AuthN vs AuthZ',
      url: 'https://www.ibm.com/think/topics/authentication-vs-authorization'
    },
    {
      label: 'Auth0 – AuthN & AuthZ overview',
      url: 'https://auth0.com/docs/get-started/identity-fundamentals/authentication-and-authorization'
    },
    {
      label: 'OAuth 2.0 – third-party login flows',
      url: 'https://en.wikipedia.org/wiki/OAuth'
    }
  ],
  quiz: {
    q: 'Which one is responsible for verifying your identity?',
    a: ['Authentication', 'Authorization', 'Tokenization', 'Encryption'],
    correct: 0,
    explanation: 'Authentication checks that you are who you claim; authorization checks what you can access.'
  }
},
  {
  id: 'session-management',
  title: 'Session Management',
  description:'Maintains user state across multiple requests in a stateless HTTP environment.',
  details: `
Session management is the process of maintaining a user's state and activity across multiple requests in a web application. Since HTTP is stateless—meaning each request is independent and doesn't remember previous ones—session management allows the server to recognize returning users and persist data like login status, preferences, or items in a shopping cart. This is typically done by assigning a unique session ID stored in a browser cookie or generating a token (like a JWT) that the client sends with every request. Proper session management includes setting timeouts, securing cookies, and ensuring sessions are invalidated upon logout to protect user data and prevent unauthorized access. `,
  code: `// Express.js with express-session (server-side session)
import express from 'express';
import session from 'express-session';

const app = express();

app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false, maxAge: 60000 } // 1 minute session
}));

app.get('/login', (req, res) => {
  req.session.user = 'john_doe';
  res.send('User logged in with session');
});

app.get('/profile', (req, res) => {
  if (req.session.user) {
    res.send(\`Welcome, \${req.session.user}\`);
  } else {
    res.status(401).send('Unauthorized');
  }
});

app.listen(3000);`,
  tags: ['state', 'cookies', 'jwt', 'security'],
  useCases: [
    'User login sessions in web apps',
    'Storing shopping cart data across pages',
    'Maintaining form progress or user settings',
    'Invalidating sessions after logout or timeout'
  ],
  resources: [
    {
      label: 'Express-session GitHub',
      url: 'https://github.com/expressjs/session'
    },
    {
      label: 'MDN – HTTP Cookies',
      url: 'https://developer.mozilla.org/en-US/docs/Web/HTTP/Cookies'
    },
    {
      label: 'JWT vs Session Comparison',
      url: 'https://jwt.io/introduction'
    }
  ],
  quiz: {
    q: 'Why is session management necessary in web applications?',
    a: [
      'To encrypt data between servers',
      'To maintain user state across requests',
      'To style frontend components',
      'To reduce server-side code'
    ],
    correct: 1,
    explanation: 'Session management keeps track of the user’s identity and data as they interact with a stateless HTTP server.'
  }
}
,
 {
  id: 'middleware',
  title: 'Middleware',
  description:'Maintains user state across multiple requests in a stateless HTTP environment.',
  details: `
Middleware is a function that sits between the request and response in a server application, helping to process or modify them before a final response is sent to the client. It's commonly used in web frameworks like Express.js to handle tasks such as authentication, logging, request parsing, error handling, and access control. Middleware functions have access to the req (request), res (response), and next() callback, which passes control to the next function in the stack. By chaining multiple middleware, developers can build modular, reusable logic to handle complex application workflows efficiently and cleanly. `,
  code: `// Express.js middleware example
import express from 'express';
const app = express();

// Global middleware for logging
app.use((req, res, next) => {
  console.log(\`\${req.method} \${req.url}\`);
  next(); // Move to the next middleware or route
});

// Middleware to protect routes
const requireAuth = (req, res, next) => {
  const isLoggedIn = req.headers['x-auth'] === 'true';
  if (isLoggedIn) {
    next();
  } else {
    res.status(401).send('Unauthorized');
  }
};

app.get('/public', (req, res) => {
  res.send('This is a public route');
});

app.get('/private', requireAuth, (req, res) => {
  res.send('This is a protected route');
});

app.listen(3000);`,
  tags: ['express', 'security', 'logging', 'modular'],
  useCases: [
    'User authentication and role checks',
    'Logging requests and errors',
    'Parsing request bodies (e.g., JSON)',
    'Rate limiting or blocking suspicious traffic',
    'Cross-Origin Resource Sharing (CORS) handling'
  ],
  resources: [
    {
      label: 'Express.js Middleware Docs',
      url: 'https://expressjs.com/en/guide/using-middleware.html'
    },
    {
      label: 'MDN – HTTP Request Lifecycle',
      url: 'https://developer.mozilla.org/en-US/docs/Web/HTTP/Overview'
    },
    {
      label: 'Node.js Request Handling Flow',
      url: 'https://nodejs.org/en/docs/guides/anatomy-of-an-http-transaction/'
    }
  ],
  quiz: {
    q: 'What is the main purpose of middleware in a web server?',
    a: [
      'To style HTML elements',
      'To handle background jobs',
      'To process requests/responses in the app flow',
      'To connect databases directly'
    ],
    correct: 2,
    explanation: 'Middleware functions sit in the request-response cycle and can modify, authenticate, or log interactions before sending a response.'
  }
},
{
  id: 'database-connectivity',
  title: 'Database Connectivity',
  description:'Establishes a connection between the server and database to perform CRUD operations.',
  details: `
Database connectivity is the process of establishing a connection between a server-side application and a database so that the application can store, retrieve, update, or delete data. This connection is made using a database driver or a library (like Mongoose for MongoDB or Sequelize for SQL) that communicates with the database using a connection string or credentials. Once connected, the server can execute queries or commands to manage data efficiently. Proper connectivity ensures that the application can persist information across user sessions and operate reliably at scale. `,
  code: `// MongoDB connection with Mongoose
import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log('MongoDB connected successfully');
  } catch (error) {
    console.error('Database connection failed:', error);
    process.exit(1);
  }
};

export default connectDB;
`,
  tags: ['database', 'mongodb', 'sql', 'mongoose', 'backend'],
  useCases: [
    'Persisting user accounts and sessions',
    'Storing product listings in e-commerce',
    'Logging transactions in fintech apps',
    'Querying analytics or historical data'
  ],
  resources: [
    {
      label: 'Mongoose Docs – MongoDB Connection',
      url: 'https://mongoosejs.com/docs/connections.html'
    },
    {
      label: 'Sequelize Docs – SQL ORM for Node.js',
      url: 'https://sequelize.org/docs/v6/getting-started/'
    },
    {
      label: 'MongoDB URI Connection Format',
      url: 'https://www.mongodb.com/docs/manual/reference/connection-string/'
    }
  ],
  quiz: {
    q: 'What is required to establish a database connection?',
    a: [
      'IP address and port only',
      'Just the database name',
      'Connection URI or credentials',
      'Frontend JavaScript code'
    ],
    correct: 2,
    explanation: 'A connection URI (or host, port, user, password) is needed to securely connect to a database.'
  }
},
  {
  id: 'websockets',
  title: 'WebSockets',
  description:'Enables real-time, two-way communication between client and server over a persistent connection.',
  details: `
WebSocket is a communication protocol that enables real-time, two-way interaction between a client (like a browser) and a server over a single, persistent connection. Unlike HTTP, where the client must initiate every request, WebSocket allows both the client and server to send messages independently after an initial handshake. This makes it ideal for applications like chat systems, live notifications, multiplayer games, and stock tickers—where immediate updates are essential. It uses ws:// or wss:// (for secure communication) and remains open until either side closes it, enabling continuous data flow without the overhead of repeated HTTP requests.`,
code: `// Basic WebSocket server using 'ws'
import { WebSocketServer } from 'ws';

const wss = new WebSocketServer({ port: 8080 });

wss.on('connection', socket => {
  console.log('Client connected');

  socket.on('message', message => {
    console.log('Received:', message);
    socket.send(\`Server says: \${message}\`);
  });

  socket.on('close', () => {
    console.log('Client disconnected');
  });
});

console.log('WebSocket server running on ws://localhost:8080');
`,
  tags: ['real-time', 'communication', 'socket.io', 'persistent'],
  useCases: [
    'Building real-time chat applications',
    'Collaborative tools like whiteboards or editors',
    'Real-time stock market dashboards',
    'Live notifications or updates in web apps'
  ],
  resources: [
    {
      label: 'MDN – WebSockets Guide',
      url: 'https://developer.mozilla.org/en-US/docs/Web/API/WebSocket'
    },
    {
      label: 'WebSocket.org – Test & Learn',
      url: 'https://www.websocket.org/'
    },
    {
      label: 'Socket.IO Documentation',
      url: 'https://socket.io/docs/v4/'
    }
  ],
  quiz: {
    q: 'What is a key benefit of using WebSockets over HTTP?',
    a: [
      'More secure than HTTPS',
      'Consumes more bandwidth',
      'Allows real-time two-way communication',
      'Only works with REST APIs'
    ],
    correct: 2,
    explanation: 'WebSockets maintain a persistent connection for real-time, bidirectional data transfer.'
  }
}
,
 {
  id: 'caching',
  title: 'Caching',
  description:'Temporarily stores frequently accessed data to reduce latency and improve performance.',
  details: `
Caching is the process of storing frequently accessed data in a temporary storage layer so it can be retrieved faster in future requests. Instead of fetching data from the original source (like a database or external API) every time, a cached version is served, which significantly reduces latency, improves performance, and lowers server load. Caching can occur at various levels—browser, server, CDN, or even in-memory (like Redis). It’s commonly used for static assets, API responses, database queries, and session data. Smart cache management includes setting expiration times (TTL), invalidating stale data, and choosing the right caching strategy (e.g., write-through, write-back, or cache-first). `,
  code: `// Example: Caching with Node.js + Redis
import express from 'express';
import fetch from 'node-fetch';
import { createClient } from 'redis';

const app = express();
const redisClient = createClient();
redisClient.connect();

app.get('/data', async (req, res) => {
  const cacheKey = 'api:data';

  // Check Redis cache
  const cached = await redisClient.get(cacheKey);
  if (cached) {
    return res.json({ source: 'cache', data: JSON.parse(cached) });
  }

  // If not cached, fetch from API
  const response = await fetch('https://api.publicapis.org/entries');
  const data = await response.json();

  // Store in Redis for 60 seconds
  await redisClient.setEx(cacheKey, 60, JSON.stringify(data));

  res.json({ source: 'api', data });
});

app.listen(3000);`,
  tags: ['performance', 'redis', 'optimization', 'scalability'],
  useCases: [
    'Speeding up API responses',
    'Reducing database queries',
    'Serving static content quickly via CDN',
    'Storing session and user preferences in memory'
  ],
  resources: [
    {
      label: 'MDN – HTTP Caching',
      url: 'https://developer.mozilla.org/en-US/docs/Web/HTTP/Caching'
    },
    {
      label: 'Redis Caching in Node.js',
      url: 'https://redis.io/docs/interact/connect/clients/node/'
    },
    {
      label: 'Caching Strategies Explained',
      url: 'https://developer.chrome.com/docs/workbox/caching-strategies-overview/'
    }
  ],
  quiz: {
    q: 'What is a major benefit of caching?',
    a: [
      'Increased bandwidth usage',
      'Faster response time and reduced server load',
      'Encrypted data at rest',
      'Slower content delivery'
    ],
    correct: 1,
    explanation: 'Caching improves performance by avoiding repeated data fetches from the source.'
  }
}
,
  {
  id: 'load-balancing',
  title: 'Load Balancing & Scaling',
  description:'Distributes traffic across servers and adjusts resources to handle increasing user load efficiently.',
  details: `
Load balancing is the process of distributing incoming network traffic evenly across multiple servers to ensure no single server becomes a bottleneck. This helps maintain high availability, improves performance, and prevents system crashes during high traffic. A load balancer acts as a traffic manager, routing requests to the healthiest and least-busy server using strategies like round-robin, least connections, or IP hash. It’s commonly used in scalable web applications, especially in cloud environments, to ensure reliable and efficient handling of user requests—even during peak loads or when one server fails. `,
  code: `// Example: Simple NGINX load balancer config
http {
  upstream my_app {
    server app-server-1:3000;
    server app-server-2:3000;
  }

  server {
    listen 80;

    location / {
      proxy_pass http://my_app;
    }
  }
}`,
  tags: ['performance', 'infrastructure', 'cloud', 'scaling'],
  useCases: [
    'Handling high-traffic events like sales or launches',
    'Ensuring zero-downtime deployments by routing traffic between versions',
    'Auto-scaling applications based on CPU/memory usage',
    'Providing fault tolerance if a server fails'
  ],
  resources: [
    {
      label: 'DigitalOcean – Load Balancer Concepts',
      url: 'https://www.digitalocean.com/docs/networking/load-balancers/'
    },
    {
      label: 'AWS – Elastic Load Balancing',
      url: 'https://aws.amazon.com/elasticloadbalancing/'
    },
    {
      label: 'NGINX Load Balancing',
      url: 'https://docs.nginx.com/nginx/admin-guide/load-balancer/http-load-balancer/'
    }
  ],
  quiz: {
    q: 'What is horizontal scaling?',
    a: [
      'Adding more memory to a server',
      'Distributing traffic using DNS',
      'Adding more server instances to handle load',
      'Caching data in the frontend'
    ],
    correct: 2,
    explanation: 'Horizontal scaling adds more server instances, allowing systems to handle more load in parallel.'
  }
}
,
  {
  id: 'error-handling',
  title: 'Error Handling',
  description:'Detects and manages unexpected issues to prevent application crashes and ensure stability.',
  details: `
Error handling is the process of detecting and managing issues that occur during the execution of a program to ensure the application continues to run smoothly or fails gracefully. In server-side development, this means catching problems like invalid input, failed database queries, or server crashes, and responding with appropriate actions—such as logging the error, sending a meaningful message to the client, or redirecting to a fallback page. Effective error handling helps maintain application stability, improves the user experience, and prevents exposure of sensitive system information. `,
  code: `// Express.js example: Centralized error handling

import express from 'express';
const app = express();

app.get('/error', (req, res, next) => {
  try {
    throw new Error('Something went wrong!');
  } catch (err) {
    next(err); // Pass error to handler
  }
});

// Error-handling middleware
app.use((err, req, res, next) => {
  console.error('Logged Error:', err.message);
  res.status(500).json({ message: 'Internal Server Error' });
});

app.listen(3000, () => console.log('Server running on port 3000'));
`,
  tags: ['resilience', 'debugging', 'stability', 'express'],
  useCases: [
    'Returning proper error messages to frontend apps',
    'Logging server-side failures for monitoring',
    'Preventing application crashes from uncaught exceptions',
    'Displaying fallback UI in case of failure'
  ],
  resources: [
    {
      label: 'MDN – JavaScript Error Handling',
      url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Control_flow_and_error_handling'
    },
    {
      label: 'Express Error Handling Guide',
      url: 'https://expressjs.com/en/guide/error-handling.html'
    },
    {
      label: 'Node.js Error Best Practices',
      url: 'https://nodejs.dev/en/learn/error-handling-in-nodejs/'
    }
  ],
  quiz: {
    q: 'What is the purpose of error-handling middleware in Express?',
    a: [
      'To log requests',
      'To serve static files',
      'To manage and respond to thrown errors',
      'To handle database queries'
    ],
    correct: 2,
    explanation: 'Error-handling middleware captures and processes errors to send a proper response without crashing the app.'
  }
}
]
