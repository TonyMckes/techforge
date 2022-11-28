import { Article, Comment, SequelizeConnection, Tag, User } from ".";

type Article = typeof Article;
type Tag = typeof Tag;
type Comment = typeof Comment;
type User = typeof User;
type ConnectionInstance = SequelizeConnection;

interface ArticleAssociates {
  Comment: Comment;
  Tag: Tag;
  User: User;
}
interface CommentAssociates {
  Article: Article;
  User: User;
}
interface TagAssociates {
  Article: Article;
}
interface UserAssociates {
  Article: Article;
  Comment: Comment;
  User: User;
}