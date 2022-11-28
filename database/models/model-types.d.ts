import { Article, Comment, sequelize, Tag, User } from ".";

type Article = typeof Article;
type Tag = typeof Tag;
type Comment = typeof Comment;
type User = typeof User;
type ConnectionInstance = typeof sequelize;

interface ArticleAssociates {
  Comment: Comment;
  Tag: Tag;
  User: User;
}
