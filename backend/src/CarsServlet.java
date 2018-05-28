package cars.api;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;

import nx_bazel_example.api.Car;
import nx_bazel_example.api.GetCarsResponse;

import com.googlecode.protobuf.format.JsonFormat;

public class CarsServlet extends HttpServlet {

  JsonFormat jsonFormat = new JsonFormat();

  @Override
  public void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException {
   
    Car lotusElise = Car.newBuilder().setMake("Lotus").setModel("Elise").setYear(2018).build();
    Car hondaCivic = Car.newBuilder().setMake("Honda").setModel("Civic").setYear(2008).build();

    GetCarsResponse cars = GetCarsResponse.newBuilder().addCars(lotusElise).addCars(hondaCivic).build();

    response.setContentType("application/json");

    response.getWriter().print(jsonFormat.printToString(cars));
  }

}
