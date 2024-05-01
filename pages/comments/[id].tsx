import { useRouter } from "next/router";
import { useEffect, useState } from "react";

function Comment() {
  const router = useRouter();
  const {id} = router.query;
  const [comment, setComment] = useState(null);

  useEffect(() => {
    const fetchComment = async () => {
      try {
        const response = await fetch(`http://localhost:3000/api/movie/comment/${id}`);
        if (!response.ok) {
          throw new Error("Failed to fetch comment");
        }
        const commentData = await response.json();
        console.log("Comment Data:", commentData); // Console response
        setComment(commentData.data);
      } catch (error) {
        console.error("Error fetching comment:", error);
      }
    };

    if (id) {
      fetchComment();
    }
  }, [id]);

  if (!comment) {
    return (
        <div style={styles.load}>
            <div style={styles.loadText}>Loading...</div>
        </div>
    );
  }

    const parseYear = (released: string | any[]) => {
        return released?.slice(0, 10) ?? 'Undefined'; // Afficher '-' si released est undefined
    };

  // @ts-ignore
  return (
      <div style= {{
          width: "100%",
          height: "100vh",
          margin: "0%",
          padding: "0%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundImage: `url(${comment.poster})`,
          backgroundSize: "cover",
          backgroundRepeat: "repeat",
      }} >
          <div style={styles.container}>
              <div style={styles.head}>
                  <h1 style={styles.headText}>Comment Details</h1>
              </div>
              <hr style={styles.hr}></hr>
              <div style={styles.body}>
                  <p style={styles.p}><strong>User's name:</strong><br></br>{comment.name}</p>
                  <p style={styles.p}><strong>Movie Name:</strong><br></br><a style={styles.link} href={`/movie/${comment.movie_id}`}>{comment.movie_name}</a></p>
                  <p style={styles.p}><strong>Text:</strong><br></br>{comment.text}</p>
                  <p style={styles.p}><strong>Date:</strong><br></br>{parseYear(comment.date)}</p>
              </div>
              <div style={styles.foot}>
                  <a href={'/comments/'} style={styles.link}>Go back to all comments</a>
              </div>
          </div>
      </div>
  )
}

export default Comment;

const styles = {
    main: {
        width: "100%",
        height: "100vh",
        margin: "0%",
        padding: "0%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundImage: "url(https://marketplace.canva.com/EAFCO6pfthY/1/0/1600w/canva-blue-green-watercolor-linktree-background-F2CyNS5sQdM.jpg)",
        backgroundSize: "cover",
        backgroundRepeat: "repeat",
        border: "1px solid #ccc",
    },
    load: {
        width: "100%",
        height: "80vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        fontFamily: "Arial, sans-serif"
    },
    loadText: {
        fontSize: "3rem"
    },
    container: {
        borderRadius: "10px",
        marginTop: "5%",
        height: "70vh",
        width: "60vw",
        backgroundColor: "#f5f5f5",
        color: "#333",
        fontFamily: "Arial, sans-serif",
        boxShadow: "rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px, rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset;",
        opacity: "0.9"
    },
    head: {
        display: "flex",
        alignItems: "center",
        justifyContent: 'center',
        fontSize: "1.5em"
    },
    headText: {
      opacity: "1"
    },
    hr: {
        width: "40%"
    },
    link: {
        textDecoration: "none",
        color: "#007bff",
        fontWeight: "bold"
    },
    body: {
        height: "45vh",
        display: "block",
        textAlign: "center",
        fontSize: "1.2em",
        paddingLeft: "50px",
        paddingRight: "50px",
        paddingTop: "40px",
        overflowY: "scroll"
    },
    p: {
        marginBottom: "30px",
        opacity: "1"
    },
    foot: {
        display: "flex",
        justifyContent: "center"
    }
}
