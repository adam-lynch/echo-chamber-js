var CommentList = {};
var Comment = require('./comment.js');

CommentList.init = function(form) {
  var list = document.createElement("div");
  list.setAttribute("id", "EC-list");
  this.list = form.parentNode.appendChild(list);
  this.path = window.location.href; 
  this.comments = this.load();
  this.render();
};

CommentList.load = function() {
  var srcComments = this.fetch();
  return _parse(srcComments);
};

CommentList.save = function() {
  localStorage.setItem(this.path, this.stringify());
};

CommentList.stringify = function() {
  return JSON.stringify(this.comments.map(function(item) {
    return {
      text: item.text,
      author: item.author,
      email: item.email,
      timestamp: item.timestamp
    }
  }));
};

CommentList.render = function(target) {
  var count = this.comments.length;
  this.listHeader = "<h3 class='mt0 mb0'>" + count + " " + _commentString(count)  + "</h3>";
  this.list.innerHTML = this.listHeader + this.buildHTML();
};

CommentList.height = function() {
  return this.list.clientHeight; 
};

CommentList.buildHTML = function() {
  var comments = this.comments.slice();
  return comments.reverse().reduce(function(total, comment) {
    return total + comment.render(); 
  }, '');
};

CommentList.fetch = function() {
  var rawComments = localStorage.getItem(this.path) || "[]";
  return JSON.parse(rawComments);
};

var _parse = function(srcComments) {
  return srcComments.map(function(comment) {
    var c = Object.create(Comment);
    c.init(comment.text, comment.author, comment.email, comment.timestamp);
    return c;
  });
};

var _commentString = function(count) {
  return count > 1 ? 'comments' : 'comment';
};

module.exports = CommentList;
