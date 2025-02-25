import { NextResponse } from "next/server"

async function generateWithStabilityAI(prompt: string) {
  if (!process.env.STABILITY_API_KEY) {
    throw new Error("STABILITY_API_KEY is not configured")
  }

  try {
    console.log("Calling Stability AI with prompt:", prompt);
    
    const response = await fetch("https://api.stability.ai/v1/generation/stable-diffusion-xl-1024-v1-0/text-to-image", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.STABILITY_API_KEY}`,
      },
      body: JSON.stringify({
        text_prompts: [
          {
            text: prompt,
            weight: 1,
          },
        ],
        cfg_scale: 7,
        height: 1024,
        width: 1024,
        steps: 30,
        samples: 1,
      }),
    })

    const responseText = await response.text();
    console.log("Stability AI raw response:", responseText);
    
    if (!response.ok) {
      let errorMessage = response.statusText;
      try {
        const errorData = JSON.parse(responseText);
        errorMessage = errorData.message || errorMessage;
      } catch (e) {
        // If parsing fails, use the status text
      }
      throw new Error(`Stability AI API error: ${response.status} - ${errorMessage}`);
    }

    let result;
    try {
      result = JSON.parse(responseText);
    } catch (e) {
      throw new Error("Failed to parse Stability AI response");
    }

    if (!result.artifacts || !result.artifacts[0] || !result.artifacts[0].base64) {
      throw new Error("Invalid response structure from Stability AI");
    }

    return result.artifacts[0].base64;
  } catch (error) {
    console.error("Stability AI API error:", error);
    throw error;
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    console.log("Received request body:", body);
    
    const { city, issue } = body;

    if (!city || !issue) {
      return NextResponse.json({ error: "City and issue are required" }, { status: 400 });
    }

    const prompt = `Create a powerful and emotional climate change awareness image depicting the impact of ${issue} in ${city}. Show realistic consequences and environmental effects, focusing on human impact and urgency for action. Style: photorealistic, dramatic lighting, emotional impact`;
    console.log("Generated prompt:", prompt);

    try {
      // Generate image using Stability AI
      const stabilityImage = await generateWithStabilityAI(prompt);
      
      // For now, we'll use the Stability AI image only
      const images = [
        {
          url: `data:image/png;base64,${stabilityImage}`,
          provider: "Stability AI",
        }
      ];

      return NextResponse.json({ images });
    } catch (apiError) {
      console.error("API provider error:", apiError);
      
      // Return a fallback image with error information
      return NextResponse.json({ 
        images: [
          {
            url: "/placeholder.svg?height=1024&width=1024",
            provider: "Error",
            error: apiError instanceof Error ? apiError.message : "Failed to generate image"
          }
        ] 
      });
    }
  } catch (error) {
    console.error("Error in API route:", error);
    return NextResponse.json({ 
      error: error instanceof Error ? error.message : "Unknown error occurred",
      images: [] 
    }, { status: 500 });
  }
}
