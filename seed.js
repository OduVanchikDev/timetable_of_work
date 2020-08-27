// import mongoose from 'mongoose';
// import db from './db';
// import User from './models/user';

const mongoose = require('mongoose');

const User = require('./models/user');

const db = require('./db');

db
  .then(async ({ disconnect }) => {
    await User.insertMany([
      {
        role: 'Менеджер',
        userName: 'Наставшев Юрий Валерьевич',
        email: 'Nastavshev_yuriy@mail.ru',
        password: '123',
      },
      {
        role: 'Сотрудник',
        userName: 'Асимова Виктория Николаевна',
        email: 'Asimova@mail.ru',
        password: '123',
      },
      {
        role: 'Сотрудник',
        userName: 'Иванов Иван Иванович',
        email: 'Ivanov@mail.ru',
        password: '123',
      },
    ]);
    disconnect();
  })
  .catch((err) => {
    console.error(err);
  });
