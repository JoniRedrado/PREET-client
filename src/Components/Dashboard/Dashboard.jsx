import "./Dashboard.style.css";
import { Link } from "react-router-dom";
import RankingChart from "./Metrics/MetricRankings/MetricRankings";
import MetricUsers from "./Metrics/MetricUsers/MetricUsers";
import BookingsChart from "./Metrics/MetricBookings/MetricBookings";
import CombinedCharts from "./Metrics/MetricNetIncomes/MetricNetIncomes"

const Dashboard = () => {
  return(
    <div>
    <div className="sidebar-card">
      <ul className="nav flex-column">
      <Link to={"/dashboard/hotels"}>
      <li className="nav-item">
        <a className="nav-link" href="#">Hotel management</a>
      </li>
      </Link>
      <Link to={"/dashboard/rooms"}>
      <li className="nav-item">
        <a className="nav-link" href="#">Room management</a>
      </li>
      </Link>
      <Link to={"/dashboard/users"}>
      <li className="nav-item">
        <a className="nav-link" href="#">User management</a>
      </li>
      </Link>
      <Link to={"/create"}>
        <li className="nav-item">
          <a className="nav-link active" aria-current="page" href="#">Add a new Hotel</a>
        </li>
      </Link>
      <Link to={"/createrooms"}>
        <li className="nav-item">
          <a className="nav-link active" aria-current="page" href="#">Add a new room</a>
        </li>
      </Link>
      <Link to={"/"}>
        <li className="nav-item">
          <a className="nav-link" href="#">Go to home</a>
        </li>
      </Link>
    </ul>
    <div className="card-container">
      <MetricUsers/>
      <RankingChart/>
      <BookingsChart/>
      <CombinedCharts/>
    </div>
  </div>
  </div>
  )
}

export default Dashboard;
