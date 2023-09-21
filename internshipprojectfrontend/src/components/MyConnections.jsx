import { useEffect, useState } from "react";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import axios from "axios";
import { conciergeBell } from "fontawesome";

function MyConnections() {
  const loggedUser = localStorage.getItem("sessionToken");
  const [connections, setConnections] = useState([]);

  async function fetchConnections() {
    try {
      const res1 = await axios.get(
        `http://localhost:8080/connection/myConnection/${loggedUser}`
      );

      // Extract connected user IDs
      const connectedUserIds = res1.data.map(
        (connection) => connection.connectedId
      );

      // Fetch usernames for connected user IDs
      const usernames = {};
      for (const userId of connectedUserIds) {
        const userResponse = await axios.get(
          `http://localhost:8080/users/${userId}/getUser`
        );
        usernames[userId] = userResponse.data.username;
      }

      // Combine connection data with usernames
      const connectionsWithUsernames = res1.data.map((connection) => ({
        ...connection,
        username: usernames[connection.connectedId],
      }));

      setConnections(connectionsWithUsernames);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchConnections();
  }, []);

  return (
    <>
      <Navbar />
      <main>
        <div className="myConnections-container">
          <Sidebar />
          <div className="connections-container">
            <h1>My Connections</h1>
            <ul>
              {connections.map((connection) => {
                if (connection.connection_id == loggedUser) {
                  return (
                    <li key={connection.connection_id}>
                      User ID: {connection.connectedId}, Username:{" "}
                      {connection.username}
                    </li>
                  );
                }
              })}
            </ul>
          </div>
        </div>
      </main>
    </>
  );
}

export default MyConnections;
