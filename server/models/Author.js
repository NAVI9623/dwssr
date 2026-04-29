class Author {
  constructor(name, description, email = "") {
    this.name = name;
    this.description = description;
    this.email = email;

    this.createdAt = new Date();
  }
}

// module.exports = Author;
export default Author;
