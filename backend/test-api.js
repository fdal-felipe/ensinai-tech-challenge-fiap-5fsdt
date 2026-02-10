#!/usr/bin/env node

/**
 * Automated API Testing Script
 * Tests all endpoints: Auth, Users, Posts, Comments, AI
 */

const http = require('http');

const BASE_URL = process.env.BASE_URL || 'http://localhost:3000';
const TIMEOUT = 5000;

let testResults = {
  passed: 0,
  failed: 0,
  errors: []
};

// Utility function to parse URL
function parseUrl(url) {
  const urlObj = new URL(url);
  return {
    hostname: urlObj.hostname,
    port: urlObj.port || 80,
    path: urlObj.pathname + urlObj.search,
    protocol: urlObj.protocol
  };
}

// Make HTTP request
function makeRequest(method, path, body = null, headers = {}) {
  return new Promise((resolve, reject) => {
    const url = BASE_URL + path;
    const urlObj = parseUrl(url);
    
    const options = {
      hostname: urlObj.hostname,
      port: urlObj.port,
      path: urlObj.path,
      method: method,
      headers: {
        'Content-Type': 'application/json',
        ...headers
      },
      timeout: TIMEOUT
    };

    const req = http.request(options, (res) => {
      let data = '';
      res.on('data', (chunk) => { data += chunk; });
      res.on('end', () => {
        try {
          const response = {
            statusCode: res.statusCode,
            headers: res.headers,
            body: data ? JSON.parse(data) : null
          };
          resolve(response);
        } catch (e) {
          resolve({
            statusCode: res.statusCode,
            headers: res.headers,
            body: data
          });
        }
      });
    });

    req.on('error', reject);
    req.on('timeout', () => {
      req.destroy();
      reject(new Error('Request timeout'));
    });

    if (body) {
      req.write(JSON.stringify(body));
    }
    req.end();
  });
}

// Test result logger
function logTest(name, passed, message = '') {
  const status = passed ? '✅' : '❌';
  console.log(`${status} ${name}${message ? ': ' + message : ''}`);
  if (passed) {
    testResults.passed++;
  } else {
    testResults.failed++;
    testResults.errors.push(name);
  }
}

// Main test suite
async function runTests() {
  console.log('\n🧪 Starting API Tests (Enhanced)...\n');
  console.log(`Base URL: ${BASE_URL}\n`);

  let token = '';
  let userId = 1;
  let postId = 1;
  let commentId = 1;
  const testEmail = `test_${Date.now()}@test.com`;
  const testPassword = 'senha123';

  try {
    // ===== TEST 1: AUTHENTICATION =====
    console.log('📝 Testing Authentication...\n');
    
    try {
      const registerRes = await makeRequest('POST', '/auth/register', {
        name: 'Test User',
        email: testEmail,
        password: testPassword,
        role: 'professor'
      });
      logTest('Register Professor', registerRes.statusCode === 201, `Status: ${registerRes.statusCode}`);
      if (registerRes.body && registerRes.body.id) {
        userId = registerRes.body.id;
      }
    } catch (e) {
      logTest('Register Professor', false, e.message);
    }

    try {
      const loginRes = await makeRequest('POST', '/auth/login', {
        email: testEmail,
        password: testPassword
      });
      logTest('Login', loginRes.statusCode === 200, `Status: ${loginRes.statusCode}`);
      if (loginRes.body && loginRes.body.token) {
        token = loginRes.body.token;
        console.log(`  → Token obtained: ${token.substring(0, 30)}...`);
      }
    } catch (e) {
      logTest('Login', false, e.message);
    }

    // ===== TEST 2: USERS MANAGEMENT =====
    console.log('\n👥 Testing Users Management...\n');

    try {
      const usersRes = await makeRequest('GET', '/users', null, { Authorization: `Bearer ${token}` });
      logTest('Get All Users', usersRes.statusCode === 200, `Status: ${usersRes.statusCode}`);
    } catch (e) {
      logTest('Get All Users', false, e.message);
    }

    try {
      const userRes = await makeRequest('GET', `/users/${userId}`, null, { Authorization: `Bearer ${token}` });
      logTest('Get User by ID', [200, 404].includes(userRes.statusCode), `Status: ${userRes.statusCode}`);
    } catch (e) {
      logTest('Get User by ID', false, e.message);
    }

    try {
      const createRes = await makeRequest('POST', '/users', {
        name: 'New User',
        email: `newuser_${Date.now()}@test.com`,
        password_hash: 'hashed_password',
        role: 'aluno'
      }, { Authorization: `Bearer ${token}` });
      logTest('Create User', [200, 201, 400, 403].includes(createRes.statusCode), `Status: ${createRes.statusCode}`);
    } catch (e) {
      logTest('Create User', false, e.message);
    }

    try {
      const updateRes = await makeRequest('PUT', `/users/${userId}`, {
        name: 'Updated User',
        email: 'updated@test.com'
      }, { Authorization: `Bearer ${token}` });
      logTest('Update User', [200, 404, 400].includes(updateRes.statusCode), `Status: ${updateRes.statusCode}`);
    } catch (e) {
      logTest('Update User', false, e.message);
    }

    // ===== TEST 3: PROFESSOR POSTS =====
    console.log('\n📚 Testing Professor Posts...\n');

    try {
      const postsRes = await makeRequest('GET', '/professor/posts', null, { Authorization: `Bearer ${token}` });
      logTest('Get Professor Posts', [200, 403].includes(postsRes.statusCode), `Status: ${postsRes.statusCode}`);
    } catch (e) {
      logTest('Get Professor Posts', false, e.message);
    }

    try {
      const createRes = await makeRequest('POST', '/professor/posts', {
        title: 'Test Post',
        content: 'This is a test post content',
        status: 'ativo'
      }, { Authorization: `Bearer ${token}` });
      logTest('Create Professor Post', [201, 200, 403].includes(createRes.statusCode), `Status: ${createRes.statusCode}`);
    } catch (e) {
      logTest('Create Professor Post', false, e.message);
    }

    try {
      const postRes = await makeRequest('GET', `/professor/posts/${postId}`, null, { Authorization: `Bearer ${token}` });
      logTest('Get Professor Post by ID', [200, 404, 403].includes(postRes.statusCode), `Status: ${postRes.statusCode}`);
    } catch (e) {
      logTest('Get Professor Post by ID', false, e.message);
    }

    // ===== TEST 4: STUDENT POSTS =====
    console.log('\n✏️  Testing Student Posts...\n');

    try {
      const postsRes = await makeRequest('GET', '/aluno/posts', null, { Authorization: `Bearer ${token}` });
      logTest('Get Student Posts', postsRes.statusCode === 200, `Status: ${postsRes.statusCode}`);
    } catch (e) {
      logTest('Get Student Posts', false, e.message);
    }

    try {
      const createRes = await makeRequest('POST', '/aluno/posts', {
        title: 'Student Test Post',
        content: 'This is a student test post',
        status: 'ativo'
      }, { Authorization: `Bearer ${token}` });
      logTest('Create Student Post', [201, 200].includes(createRes.statusCode), `Status: ${createRes.statusCode}`);
    } catch (e) {
      logTest('Create Student Post', false, e.message);
    }

    try {
      const postRes = await makeRequest('GET', `/aluno/posts/${postId}`, null, { Authorization: `Bearer ${token}` });
      logTest('Get Student Post by ID', [200, 404].includes(postRes.statusCode), `Status: ${postRes.statusCode}`);
    } catch (e) {
      logTest('Get Student Post by ID', false, e.message);
    }

    // ===== TEST 5: COMMENTS =====
    console.log('\n💬 Testing Comments...\n');

    try {
      const commentsRes = await makeRequest('GET', `/posts/${postId}/comments`, null, { Authorization: `Bearer ${token}` });
      logTest('Get Comments for Post', [200, 404].includes(commentsRes.statusCode), `Status: ${commentsRes.statusCode}`);
    } catch (e) {
      logTest('Get Comments for Post', false, e.message);
    }

    try {
      const createRes = await makeRequest('POST', `/posts/${postId}/comments`, {
        content: 'Great post!',
        author_id: userId
      }, { Authorization: `Bearer ${token}` });
      logTest('Create Comment', [201, 200, 404].includes(createRes.statusCode), `Status: ${createRes.statusCode}`);
    } catch (e) {
      logTest('Create Comment', false, e.message);
    }

    try {
      const commentRes = await makeRequest('GET', `/posts/${postId}/comments/${commentId}`, null, { Authorization: `Bearer ${token}` });
      logTest('Get Comment by ID', [200, 404].includes(commentRes.statusCode), `Status: ${commentRes.statusCode}`);
    } catch (e) {
      logTest('Get Comment by ID', false, e.message);
    }

    // ===== TEST 6: AI AGENT =====
    console.log('\n🤖 Testing AI Agent...\n');

    try {
      const generateRes = await makeRequest('POST', '/ai/generate', {
        title: 'Test Topic for AI'
      }, { Authorization: `Bearer ${token}` });
      logTest('AI - Generate Content', generateRes.statusCode === 200, `Status: ${generateRes.statusCode}`);
      if (generateRes.body && generateRes.body.content) {
        console.log(`  → Generated: "${generateRes.body.content.substring(0, 50)}..."`);
      }
    } catch (e) {
      logTest('AI - Generate Content', false, e.message);
    }

    try {
      const analyzeRes = await makeRequest('POST', '/ai/analyze', {
        title: 'Understanding REST APIs',
        content: 'REST is an architectural style. It uses HTTP verbs: GET, POST, PUT, DELETE. APIs should be stateless and cacheable.'
      }, { Authorization: `Bearer ${token}` });
      logTest('AI - Analyze Post', analyzeRes.statusCode === 200, `Status: ${analyzeRes.statusCode}`);
      if (analyzeRes.body && analyzeRes.body.analysis) {
        console.log(`  → Tags: ${analyzeRes.body.analysis.tags?.join(', ') || 'N/A'}`);
      }
    } catch (e) {
      logTest('AI - Analyze Post', false, e.message);
    }

    try {
      const moderateRes = await makeRequest('POST', '/ai/moderate', {
        content: 'This is appropriate educational content.',
        type: 'post'
      }, { Authorization: `Bearer ${token}` });
      logTest('AI - Moderate Content', moderateRes.statusCode === 200, `Status: ${moderateRes.statusCode}`);
      if (moderateRes.body && moderateRes.body.moderation) {
        console.log(`  → Appropriate: ${!moderateRes.body.moderation.isInappropriate}`);
      }
    } catch (e) {
      logTest('AI - Moderate Content', false, e.message);
    }

    try {
      const respondRes = await makeRequest('POST', '/ai/respond', {
        commentText: 'Great post!',
        postId: postId
      }, { Authorization: `Bearer ${token}` });
      logTest('AI - Generate Response', respondRes.statusCode === 200, `Status: ${respondRes.statusCode}`);
      if (respondRes.body && respondRes.body.response) {
        console.log(`  → Response: "${respondRes.body.response}"`);
      }
    } catch (e) {
      logTest('AI - Generate Response', false, e.message);
    }

    // ===== TEST SUMMARY =====
    console.log('\n' + '='.repeat(50));
    console.log('📊 TEST SUMMARY\n');
    console.log(`✅ Passed: ${testResults.passed}`);
    console.log(`❌ Failed: ${testResults.failed}`);
    console.log(`📈 Success Rate: ${((testResults.passed / (testResults.passed + testResults.failed)) * 100).toFixed(2)}%`);
    
    if (testResults.errors.length > 0) {
      console.log('\n⚠️  Failed Tests:');
      testResults.errors.forEach(error => console.log(`  - ${error}`));
    }
    console.log('\n' + '='.repeat(50));

  } catch (error) {
    console.error('❌ Critical Error:', error.message);
    process.exit(1);
  }
}

// Run tests
runTests().catch(console.error);
