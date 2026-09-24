import test from 'node:test';
import assert from 'node:assert/strict';
import api from '../src/services/api/index.js';
import {
  registerUser,
  loginUser,
  changePassword,
  resetPassword,
} from '../src/services/api/authApi.js';

test('AuthFE API Client Suite', async (t) => {
  await t.test('registerUser sends raw password without client-side hashing', async () => {
    let capturedBody = null;
    const originalPost = api.post;
    api.post = async (url, data) => {
      capturedBody = data;
      return { data: { message: 'success' } };
    };

    try {
      const rawPassword = 'myPlainPassword123!';
      await registerUser({ name: 'Test', email: 'test@example.com', password: rawPassword });
      assert.equal(capturedBody.password, rawPassword);
      assert.notEqual(capturedBody.password.length, 64, 'Password should not be a SHA-256 hash');
    } finally {
      api.post = originalPost;
    }
  });

  await t.test('loginUser sends raw password directly', async () => {
    let capturedBody = null;
    const originalPost = api.post;
    api.post = async (url, data) => {
      capturedBody = data;
      return { data: { message: 'success' } };
    };

    try {
      const rawPassword = 'secretPassword456';
      await loginUser({ email: 'test@example.com', password: rawPassword });
      assert.equal(capturedBody.password, rawPassword);
    } finally {
      api.post = originalPost;
    }
  });

  await t.test('changePassword sends raw oldPassword and newPassword', async () => {
    let capturedBody = null;
    const originalPut = api.put;
    api.put = async (url, data) => {
      capturedBody = data;
      return { data: { message: 'success' } };
    };

    try {
      await changePassword({ oldPassword: 'oldPass123', newPassword: 'newPass456' });
      assert.equal(capturedBody.oldPassword, 'oldPass123');
      assert.equal(capturedBody.newPassword, 'newPass456');
    } finally {
      api.put = originalPut;
    }
  });

  await t.test('resetPassword sends raw newPassword with reset token', async () => {
    let capturedBody = null;
    const originalPost = api.post;
    api.post = async (url, data) => {
      capturedBody = data;
      return { data: { message: 'success' } };
    };

    try {
      await resetPassword({ token: 'raw-token-abc', newPassword: 'freshPassword789' });
      assert.equal(capturedBody.token, 'raw-token-abc');
      assert.equal(capturedBody.newPassword, 'freshPassword789');
    } finally {
      api.post = originalPost;
    }
  });
});
