package cars.api;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;

public class CarsServlet extends HttpServlet {

  @Override
  public void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException {
    setAccessControlHeaders(response);

    String cars = "[\"BMW\", \"Mercedes-Benz\", \"Lamborghini\", \"Ferrari\", \"Maserati\", \"Bentley\"]";

    response.setContentType("application/json");

    response.getWriter().print(cars);
  }

  @Override
  protected void doOptions(HttpServletRequest request, HttpServletResponse response)
          throws ServletException, IOException {
      setAccessControlHeaders(response);
      response.setStatus(HttpServletResponse.SC_OK);
  }

  private void setAccessControlHeaders(HttpServletResponse response) {
    response.setHeader("Access-Control-Allow-Origin", "*");
    response.setHeader("Access-Control-Allow-Methods", "GET");
  }
 
}
