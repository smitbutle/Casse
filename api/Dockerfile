# Use the official Python image from the Docker Hub
FROM python:3.12-slim

# Set the working directory in the container to /app
WORKDIR /app

# Copy the requirements.txt file into the container at /app
COPY requirements.txt /app/

# Install any needed packages specified in requirements.txt
RUN pip install -r requirements.txt

# Copy the rest of the application code into the container at /app
COPY . /app

# Make port 80 available to the world outside this container
EXPOSE 8010

# Run run.py when the container launches
RUN ["mkdir /app/temp"]

CMD ["python", "run.py"]
