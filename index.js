require("dotenv/config");
const express = require("express");
const cors = require("cors");

const postRouter = require("./routes/posts"); // posts.js랑 연결고리
const pool = require("./routes/db");

const app = express();
const port = 3006;

app.use(express.urlencoded({ extended: true }));
app.use(cors()); // CORS 설정 추가
app.use(express.json());

app.get("/", (req, res) => {
  res.send("main page");
});

// app.use(userRouter); // user.js랑 연결고리
// app.use("/users", userRouter);
// 나는 이 연결고리를 /users라고 주소창에 있으면 가동시킬거얌.  이렇게하면 user.js에 "/users"에서 user는 지워도된다.
app.use("/books", postRouter);

//404페이지 만들기
app.use("*", (req, res) => {
  res.status(404).send("<h1>page error warning!</h1>");
});
//모든페이지이지만, 위를 제외한다면 없는 페이지라고 표기해줘

app.listen(port, () => {
  console.log(`running on http://localhost:${port}`);
});
