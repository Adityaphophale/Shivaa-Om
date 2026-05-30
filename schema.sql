-- Schema for Shivaa Om Globe Trade

CREATE DATABASE IF NOT EXISTS shivaaomglobetrade CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE shivaaomglobetrade;

CREATE TABLE IF NOT EXISTS enquiries (
  id INT AUTO_INCREMENT PRIMARY KEY,
  full_name VARCHAR(255) NOT NULL,
  organization VARCHAR(255),
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(50),
  country VARCHAR(100),
  product_interest VARCHAR(255),
  message TEXT,
  source_page VARCHAR(255),
  status ENUM('New','Contacted','Closed') DEFAULT 'New',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS admins (
  id INT AUTO_INCREMENT PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
