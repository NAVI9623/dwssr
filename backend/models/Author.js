class Author {
  constructor(name, description, email = '', website = '') {
    this.name = name;
    this.description = description;
    this.email = email;
    
    this.createdAt = new Date();
  }
}

// module.exports = Author;
export default Author;