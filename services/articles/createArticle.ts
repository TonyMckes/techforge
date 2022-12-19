import { Article, Tag, User } from "database/models";
import { appendFavorites, appendFollowers, slugify } from "lib/helpers";

interface ArticleInput {
  loggedUser: User;
  title: string;
  description: string;
  body: string;
  tagList: string[];
}

async function createArticle({
  loggedUser,
  body,
  description,
  tagList: tags,
  title,
}: ArticleInput) {
  if (!loggedUser) throw new Error("not logged in");
  if (!description) throw new Error("FieldRequiredError");
  if (!body) throw new Error("FieldRequiredError");
  if (!title) throw new Error("FieldRequiredError");

  const slug = slugify(title);

  const [article, created] = await Article.findOrCreate({
    where: { slug },
    defaults: { body, description, slug, title },
  });
  if (!created) throw new Error("Already existing title");

  const author = await User.findOne({ where: { email: loggedUser.email } });
  if (!author) throw new Error("not logged in");
  await article.setAuthor(author);

  await appendFollowers(author, author);

  const tagList = await Promise.all(
    tags.map(async (tagFromList: string) => {
      const [tag] = await Tag.findOrCreate({
        where: { name: tagFromList.trim() },
      });

      return tag;
    })
  );

  await appendFavorites(article, author);

  article.setDataValue("author", author);
  article.setDataValue("tagList", tagList);

  return article;
}

export default createArticle;
