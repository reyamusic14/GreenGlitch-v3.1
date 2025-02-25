"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Skeleton } from "@/components/ui/skeleton"
import { Download, Facebook, Instagram, Twitter } from 'lucide-react'
import Image from "next/image"
import { toast } from "@/components/ui/use-toast"
import { climateData, climateIssues } from "./data/climate-data"

export default function GreenGitch() {
  const [selectedCity, setSelectedCity] = useState("")
  const [selectedIssue, setSelectedIssue] = useState("")
  const [generatedImages, setGeneratedImages] = useState<Array<{ url: string; provider: string }>>([])
  const [isLoading, setIsLoading] = useState(false)
  const [slogans, setSlogans] = useState<string[]>([])
  const [songUrl, setSongUrl] = useState<string | null>(null)
  const [isGeneratingSlogans, setIsGeneratingSlogans] = useState(false)
  const [isGeneratingSong, setIsGeneratingSong] = useState(false)

  // Update the handleGenerateImages function with better error handling
  const handleGenerateImages = async () => {
    setIsLoading(true)
    try {
      console.log("Sending request to generate images with:", { city: selectedCity, issue: selectedIssue })

      const response = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          city: selectedCity,
          issue: selectedIssue,
        }),
      })

      const responseText = await response.text()
      console.log("Raw API response:", responseText)

      if (!response.ok) {
        throw new Error(`Failed to generate images: ${response.status} ${response.statusText}`)
      }

      let data
      try {
        data = JSON.parse(responseText)
      } catch (parseError) {
        console.error("Error parsing JSON response:", parseError)
        throw new Error("Invalid response format from server")
      }

      if (!data.images || !Array.isArray(data.images)) {
        console.error("Invalid response structure:", data)
        throw new Error("Server returned an invalid response structure")
      }

      setGeneratedImages(data.images)
    } catch (error) {
      console.error("Error generating images:", error)
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to generate images. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleGenerateSlogans = async () => {
    setIsGeneratingSlogans(true)
    try {
      const response = await fetch("/api/slogans", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          city: selectedCity,
          issue: selectedIssue,
        }),
      })

      if (!response.ok) {
        throw new Error("Failed to generate slogans")
      }

      const data = await response.json()
      setSlogans(data.slogans)
    } catch (error) {
      console.error("Error generating slogans:", error)
      toast({
        title: "Error",
        description: "Failed to generate slogans. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsGeneratingSlogans(false)
    }
  }

  const handleGenerateSong = async () => {
    setIsGeneratingSong(true)
    try {
      const response = await fetch("/api/song", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          city: selectedCity,
          issue: selectedIssue,
        }),
      })

      if (!response.ok) {
        throw new Error("Failed to generate song")
      }

      const data = await response.json()
      setSongUrl(data.songUrl)
    } catch (error) {
      console.error("Error generating song:", error)
      toast({
        title: "Error",
        description: "Failed to generate song. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsGeneratingSong(false)
    }
  }

  const handleDownload = async (imageUrl: string) => {
    try {
      const response = await fetch(imageUrl)
      const blob = await response.blob()  => {
    try {
      const response = await fetch(imageUrl)
      const blob = await response.blob()
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement("a")
      a.href = url
      a.download = `climate-awareness-${Date.now()}.jpg`
      document.body.appendChild(a)
      a.click()
      window.URL.revokeObjectURL(url)
      document.body.removeChild(a)
    } catch (error) {
      console.error("Error downloading image:", error)
    }
  }

  const handleDownloadSong = async () => {
    if (!songUrl) return

    try {
      const response = await fetch(songUrl)
      const blob = await response.blob()
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement("a")
      a.href = url
      a.download = `climate-awareness-song-${Date.now()}.mp3`
      document.body.appendChild(a)
      a.click()
      window.URL.revokeObjectURL(url)
      document.body.removeChild(a)
    } catch (error) {
      console.error("Error downloading song:", error)
    }
  }

  const handleShare = (platform: string, imageUrl: string) => {
    const text = `Check out this climate change awareness image for ${selectedCity}'s ${selectedIssue} issue!`
    const url = encodeURIComponent(window.location.href)

    const shareUrls = {
      twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${url}`,
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${url}`,
      instagram: `https://instagram.com`, // Note: Instagram doesn't support direct sharing via URL
    }

    window.open(shareUrls[platform as keyof typeof shareUrls], "_blank")
  }

  const handleShareAll = () => {
    if (generatedImages.length === 0 || !slogans.length || !songUrl) {
      toast({
        title: "Cannot share",
        description: "Please generate an image, slogans, and a song first.",
        variant: "destructive",
      })
      return
    }

    const text = `Check out this climate change awareness content for ${selectedCity}'s ${selectedIssue} issue!\n\nSlogans:\n${slogans.join("\n")}`
    const url = encodeURIComponent(window.location.href)

    // For demonstration, we'll share to Twitter
    window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${url}`, "_blank")
  }

  // Get climate issue data if city and issue are selected
  const issueData = selectedCity && selectedIssue ? climateData[selectedCity]?.[selectedIssue] : null

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-green-100 p-4">
      <Card className="max-w-md mx-auto bg-white/80 backdrop-blur">
        <CardContent className="p-6 space-y-6">
          <h1 className="text-2xl font-bold text-center text-green-800 mb-6">GreenGitch</h1>

          <div className="space-y-4">
            <Select
              onValueChange={(value) => {
                setSelectedCity(value)
                setSelectedIssue("")
                setSlogans([])
                setSongUrl(null)
                setGeneratedImages([])
              }}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select a city" />
              </SelectTrigger>
              <SelectContent>
                {Object.keys(climateIssues).map((city) => (
                  <SelectItem key={city} value={city}>
                    {city}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select onValueChange={setSelectedIssue} disabled={!selectedCity}>
              <SelectTrigger>
                <SelectValue placeholder="Select climate issue" />
              </SelectTrigger>
              <SelectContent>
                {selectedCity &&
                  climateIssues[selectedCity as keyof typeof climateIssues].map((issue) => (
                    <SelectItem key={issue} value={issue}>
                      {issue}
                    </SelectItem>
                  ))}
              </SelectContent>
            </Select>

            <div className="grid grid-cols-1 gap-2">
              <Button
                className="w-full bg-green-600 hover:bg-green-700"
                onClick={handleGenerateImages}
                disabled={!selectedCity || !selectedIssue || isLoading}
              >
                {isLoading ? "Generating..." : "Generate Awareness Image"}
              </Button>
            </div>
          </div>

          <div className="space-y-6">
            {isLoading ? (
              <Skeleton className="w-full h-[300px] rounded-lg" />
            ) : (
              generatedImages.map((image, index) => (
                <div key={index} className="space-y-6">
                  <div className="space-y-2">
                    <div className="relative rounded-lg overflow-hidden">
                      <Image
                        src={image.url || "/placeholder.svg"}
                        alt={`Climate awareness image ${index + 1}`}
                        width={400}
                        height={300}
                        className="w-full object-cover"
                      />
                      <div className="absolute top-2 right-2 bg-black/50 text-white px-2 py-1 rounded text-sm">
                        {image.provider}
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" className="flex-1" onClick={() => handleDownload(image.url)}>
                        <Download className="w-4 h-4 mr-2" />
                        Save
                      </Button>
                      <Button variant="outline" size="icon" onClick={() => handleShare("twitter", image.url)}>
                        <Twitter className="w-4 h-4" />
                      </Button>
                      <Button variant="outline" size="icon" onClick={() => handleShare("facebook", image.url)}>
                        <Facebook className="w-4 h-4" />
                      </Button>
                      <Button variant="outline" size="icon" onClick={() => handleShare("instagram", image.url)}>
                        <Instagram className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>

                  {/* Climate information displayed after image generation */}
                  {issueData && (
                    <div className="mt-4 space-y-4">
                      <div className="bg-white/90 rounded-lg p-3 shadow-sm">
                        <h3 className="text-md font-semibold text-green-800 mb-2">Causes</h3>
                        <ul className="list-disc pl-5 space-y-1 text-sm">
                          {issueData.causes.map((cause, index) => (
                            <li key={index}>{cause}</li>
                          ))}
                        </ul>
                      </div>

                      <div className="bg-white/90 rounded-lg p-3 shadow-sm">
                        <h3 className="text-md font-semibold text-green-800 mb-2">Effects</h3>
                        <ul className="list-disc pl-5 space-y-1 text-sm">
                          {issueData.effects.map((effect, index) => (
                            <li key={index}>{effect}</li>
                          ))}
                        </ul>
                      </div>

                      <div className="bg-white/90 rounded-lg p-3 shadow-sm">
                        <h3 className="text-md font-semibold text-green-800 mb-2">Solutions</h3>
                        <ul className="list-disc pl-5 space-y-1 text-sm">
                          {issueData.solutions.map((solution, index) => (
                            <li key={index}>{solution}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
