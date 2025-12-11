/**
 * Script de prueba para el endpoint de contacto
 *
 * Uso:
 * 1. Asegúrate de tener el servidor corriendo (vercel dev o npm run dev)
 * 2. Ejecuta: node test-contact.js
 */

const API_URL = process.env.API_URL || 'http://localhost:3000/api/contact';

const testCases = [
  {
    name: '✅ Valid Contact',
    data: {
      name: 'John Doe',
      email: 'john.doe@example.com',
      message: 'This is a test message from the testing script. Hello there!',
    },
    shouldSucceed: true,
  },
  {
    name: '❌ Invalid Email',
    data: {
      name: 'Jane Smith',
      email: 'invalid-email',
      message: 'This should fail because of invalid email format.',
    },
    shouldSucceed: false,
  },
  {
    name: '❌ Short Message',
    data: {
      name: 'Bob Johnson',
      email: 'bob@example.com',
      message: 'Short',
    },
    shouldSucceed: false,
  },
  {
    name: '❌ Short Name',
    data: {
      name: 'A',
      email: 'alice@example.com',
      message: 'This is a valid message but the name is too short.',
    },
    shouldSucceed: false,
  },
  {
    name: '❌ Missing Fields',
    data: {
      name: 'Test User',
      email: 'test@example.com',
      // message is missing
    },
    shouldSucceed: false,
  },
];

async function testEndpoint(testCase) {
  console.log(`\n🧪 Testing: ${testCase.name}`);
  console.log('📤 Sending:', JSON.stringify(testCase.data, null, 2));

  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(testCase.data),
    });

    const result = await response.json();
    const success = response.ok && result.success;

    console.log(`📥 Status: ${response.status}`);
    console.log('📥 Response:', JSON.stringify(result, null, 2));

    if (success === testCase.shouldSucceed) {
      console.log('✅ Test passed!');
      return true;
    } else {
      console.log('❌ Test failed! Expected success:', testCase.shouldSucceed);
      return false;
    }
  } catch (error) {
    console.log('❌ Test error:', error.message);
    return false;
  }
}

async function runTests() {
  console.log('🚀 Starting Contact API Tests');
  console.log(`📍 API URL: ${API_URL}`);
  console.log('=' .repeat(60));

  let passed = 0;
  let failed = 0;

  for (const testCase of testCases) {
    const result = await testEndpoint(testCase);
    if (result) {
      passed++;
    } else {
      failed++;
    }

    // Wait a bit between tests to avoid rate limiting
    await new Promise(resolve => setTimeout(resolve, 500));
  }

  console.log('\n' + '=' .repeat(60));
  console.log('📊 Test Results:');
  console.log(`  ✅ Passed: ${passed}`);
  console.log(`  ❌ Failed: ${failed}`);
  console.log(`  📈 Total: ${passed + failed}`);
  console.log('=' .repeat(60));

  if (failed === 0) {
    console.log('\n🎉 All tests passed!');
  } else {
    console.log('\n⚠️  Some tests failed. Check the output above.');
    process.exit(1);
  }
}

// Run tests
runTests().catch(error => {
  console.error('💥 Fatal error:', error);
  process.exit(1);
});
