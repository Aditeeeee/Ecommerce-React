export const getAllProducts = async () => {
  try {
    const response = await fetch("https://fakestoreapi.com/products", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch the data!!");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
    console.error(error || "Failed to fetch the data!!");
    throw error;
  }
};
