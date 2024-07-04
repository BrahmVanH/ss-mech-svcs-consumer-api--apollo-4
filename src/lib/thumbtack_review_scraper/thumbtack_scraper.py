
import requests
import json
from bs4 import BeautifulSoup

def scrape_thumbtack_reviews(url):
    
    try:

        response = requests.get(url)
        response.raise_for_status()  # Raise an exception if the request fails
        soup = BeautifulSoup(response.content, 'html.parser')

        # Extract script tags containing JSON data
        script_tags = soup.find_all('script')
        
        # Find the script tag containing review data
        for script_tag in script_tags:
            if '"@graph"' in str(script_tag):
                json_content = script_tag.string.strip()
                data_dict = json.loads(json_content)
                break
        else:
            return "No reviews found"

        # Extract review objects
        reviews = data_dict["@graph"][0].get("review")
        # print(reviews)
        
        return reviews

        
        # print(f"Reviews: {reviews}")

        # Extracting reviews into variables
        # review_1 = reviews[0]
        # review_2 = reviews[1]
        # review_3 = reviews[2]
        
        # return [review_1, review_2, review_3]

    except requests.RequestException as e:
        return f"Error fetching data: {e}"

if __name__ == "__main__":
    thumbtack_url = "https://www.thumbtack.com/mi/marquette/handyman/south-shore-mechanical-services/service/508465315204210696"
    scraped_reviews = scrape_thumbtack_reviews(thumbtack_url)
    print(f"{scraped_reviews}")
    
