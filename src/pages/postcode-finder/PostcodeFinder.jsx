"use client"

import { useEffect, useMemo, useRef, useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import axios from "axios"
import { Search, MapPin, Loader2, Check, Building2, X, Map, Globe, Sparkles } from "lucide-react"

function PostcodeFinder() {
  const [query, setQuery] = useState("")
  const [suggestions, setSuggestions] = useState([])
  const [results, setResults] = useState([])
  const [loadingSuggest, setLoadingSuggest] = useState(false)
  const [loadingResults, setLoadingResults] = useState(false)
  const [error, setError] = useState("")
  const [selectedId, setSelectedId] = useState(null)
  const [mapAddress, setMapAddress] = useState("")
  const controllerRef = useRef(null)

  const isPostcodeOnly = useMemo(() => {
    const trimmed = query.trim()
    const re =
      /^(GIR\s?0AA|(?:(?:[A-Z][0-9]{1,2})|(?:[A-Z][A-HJ-Ya-hj-y][0-9]{1,2})|(?:[A-Z][0-9][A-Z])|(?:[A-Z][A-HJ-Ya-hj-y][0-9][A-Z]))\s?[0-9][A-Z]{2})$/i
    return re.test(trimmed)
  }, [query])

  useEffect(() => {
    if (controllerRef.current) controllerRef.current.abort()
    if (!query || query.trim().length < 2) {
      setSuggestions([])
      setSelectedId(null)
      return
    }
    setError("")
    setLoadingSuggest(true)
    const c = new AbortController()
    controllerRef.current = c
    const run = async () => {
      try {
        const url = `https://ws.postcoder.com/pcw/autocomplete/find?query=${encodeURIComponent(query)}&country=uk&apikey=PCW87-ZUQA3-UJR2N-DBS8H`
        const res = await axios.get(url, { responseType: "text", signal: c.signal })
        const text = typeof res.data === "string" ? res.data : ""
        let parsed = []
        try {
          const doc = new window.DOMParser().parseFromString(text, "text/xml")
          const nodes = Array.from(doc.getElementsByTagName("Suggestion"))
          parsed = nodes
            .map((n) => ({
              id: n.getElementsByTagName("id")[0]?.textContent || "",
              summaryline: n.getElementsByTagName("summaryline")[0]?.textContent || "",
              locationsummary: n.getElementsByTagName("locationsummary")[0]?.textContent || "",
            }))
            .filter((s) => s.id)
        } catch {}
        if (!parsed.length) {
          const jsonUrl = `https://ws.postcoder.com/pcw/PCW87-ZUQA3-UJR2N-DBS8H/address/uk/${encodeURIComponent(query)}?format=json`
          const jr = await axios.get(jsonUrl, { signal: c.signal })
          parsed = (jr.data || [])
            .slice(0, 10)
            .map((a, idx) => ({ id: `text-${idx}`, summaryline: a.summaryline, locationsummary: a.postcode }))
        }
        setSuggestions(parsed)
      } catch (e) {
        if (axios.isCancel(e)) return
        setError("Unable to load suggestions")
      } finally {
        setLoadingSuggest(false)
      }
    }
    const t = setTimeout(run, 300)
    return () => clearTimeout(t)
  }, [query])

  const doLookup = async () => {
    if (!query.trim()) return
    setError("")
    setLoadingResults(true)
    setResults([])
    try {
      const url = `https://ws.postcoder.com/pcw/PCW87-ZUQA3-UJR2N-DBS8H/address/uk/${encodeURIComponent(query.trim())}?format=json`
      const res = await axios.get(url)
      setResults(res.data || [])
    } catch (e) {
      setError("Lookup failed")
    } finally {
      setLoadingResults(false)
    }
  }

  const onSelectSuggestion = async (s) => {
    setSelectedId(s.id)
    setError("")
    setLoadingResults(true)
    setResults([])
    try {
      if (s.id && !String(s.id).startsWith("text-")) {
        const url = `https://ws.postcoder.com/pcw/autocomplete/retrieve?id=${encodeURIComponent(s.id)}&query=${encodeURIComponent(query)}&country=uk&apikey=PCW87-ZUQA3-UJR2N-DBS8H`
        const res = await axios.get(url, { responseType: "text" })
        const doc = new window.DOMParser().parseFromString(res.data || "", "text/xml")
        const nodes = Array.from(doc.getElementsByTagName("Address"))
        const addr = nodes.map((n) => ({
          summaryline: n.getElementsByTagName("summaryline")[0]?.textContent || "",
          organisation: n.getElementsByTagName("organisation")[0]?.textContent || "",
          number: n.getElementsByTagName("number")[0]?.textContent || "",
          premise: n.getElementsByTagName("premise")[0]?.textContent || "",
          street: n.getElementsByTagName("street")[0]?.textContent || "",
          posttown: n.getElementsByTagName("posttown")[0]?.textContent || "",
          county: n.getElementsByTagName("county")[0]?.textContent || "",
          postcode: n.getElementsByTagName("postcode")[0]?.textContent || "",
        }))
        if (addr.length) {
          setResults(addr)
        } else {
          const url2 = `https://ws.postcoder.com/pcw/PCW87-ZUQA3-UJR2N-DBS8H/address/uk/${encodeURIComponent(query.trim())}?format=json`
          const jr = await axios.get(url2)
          setResults(jr.data || [])
        }
      } else {
        const url = `https://ws.postcoder.com/pcw/PCW87-ZUQA3-UJR2N-DBS8H/address/uk/${encodeURIComponent(s.summaryline || query)}?format=json`
        const res = await axios.get(url)
        setResults(res.data || [])
      }
    } catch (e) {
      setError("Address retrieval failed")
    } finally {
      setLoadingResults(false)
    }
  }

  const renderSuggestion = (s) => (
    <button
      key={s.id}
      onClick={() => onSelectSuggestion(s)}
      className={`group w-full text-left px-4 py-3 rounded-xl transition-all duration-200 border ${
        selectedId === s.id
          ? "bg-primary/10 border-primary/30 shadow-sm"
          : "bg-card border-transparent hover:bg-secondary/50 hover:border-border"
      }`}
    >
      <div className="flex items-center gap-3">
        <div
          className={`flex items-center justify-center w-10 h-10 rounded-lg transition-colors ${
            selectedId === s.id ? "bg-primary/20" : "bg-secondary group-hover:bg-primary/10"
          }`}
        >
          <MapPin
            size={18}
            className={selectedId === s.id ? "text-primary" : "text-muted-foreground group-hover:text-primary"}
          />
        </div>
        <div className="flex-1 min-w-0">
          <div className="text-sm font-medium text-foreground truncate">{s.summaryline}</div>
          <div className="text-xs text-muted-foreground truncate">{s.locationsummary}</div>
        </div>
        {selectedId === s.id && (
          <div className="flex items-center justify-center w-6 h-6 rounded-full bg-primary">
            <Check size={14} className="text-primary-foreground" />
          </div>
        )}
      </div>
    </button>
  )

  const renderResult = (r, i) => {
    const addressLine =
      r.summaryline ||
      [r.organisation, r.premise, r.street, r.posttown, r.county, r.postcode].filter(Boolean).join(", ")

    return (
      <Card
        key={i}
        className="group bg-card border-border/50 hover:border-primary/30 transition-all duration-300 hover:shadow-lg hover:shadow-primary/5"
      >
        <CardContent className="p-5">
          <div className="flex items-start gap-4">
            <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-primary/20 to-primary/5 shrink-0">
              <Building2 size={22} className="text-primary" />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-foreground text-base mb-3 leading-tight">{addressLine}</h3>
              <div className="grid grid-cols-2 gap-x-6 gap-y-2">
                {r.organisation && (
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-muted-foreground">Organisation:</span>
                    <span className="text-sm text-foreground">{r.organisation}</span>
                  </div>
                )}
                {r.number && (
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-muted-foreground">Number:</span>
                    <span className="text-sm text-foreground">{r.number}</span>
                  </div>
                )}
                {r.premise && (
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-muted-foreground">Premise:</span>
                    <span className="text-sm text-foreground">{r.premise}</span>
                  </div>
                )}
                {r.buildingname && (
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-muted-foreground">Building:</span>
                    <span className="text-sm text-foreground">{r.buildingname}</span>
                  </div>
                )}
                {r.street && (
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-muted-foreground">Street:</span>
                    <span className="text-sm text-foreground">{r.street}</span>
                  </div>
                )}
                {r.dependentlocality && (
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-muted-foreground">Locality:</span>
                    <span className="text-sm text-foreground">{r.dependentlocality}</span>
                  </div>
                )}
                {r.posttown && (
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-muted-foreground">Town:</span>
                    <span className="text-sm text-foreground">{r.posttown}</span>
                  </div>
                )}
                {r.county && (
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-muted-foreground">County:</span>
                    <span className="text-sm text-foreground">{r.county}</span>
                  </div>
                )}
                {r.postcode && (
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-muted-foreground">Postcode:</span>
                    <span className="text-sm font-medium text-primary">{r.postcode}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="mt-4 pt-4 border-t border-border/50">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setMapAddress(addressLine)}
              className="gap-2 hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all"
            >
              <Map size={16} />
              View on Map
            </Button>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Mini Hero Section */}
      <main className="max-w-5xl mx-auto px-4 sm:px-6 py-8">
        <section className="text-center mb-8">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 mb-4">
            <Sparkles size={14} className="text-primary" />
            <span className="text-xs font-medium text-primary">Powered by Bristol Utilities Data</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-foreground mb-2 text-balance">
            UK Address & Postcode Finder
          </h1>
          <p className="text-muted-foreground text-sm sm:text-base max-w-xl mx-auto">
            Search over 30 million UK addresses instantly. Enter a postcode, street name, or building to get started.
          </p>
        </section>

        {/* Search Section - Full Width at Top */}
        <section className="mb-8">
          <Card className="bg-card border-border/50 shadow-xl shadow-black/5">
            <CardContent className="p-5 sm:p-6">
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 mb-4">
                <div className="flex-1 relative">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground">
                    <Search size={20} />
                  </div>
                  <Input
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Enter postcode, street name, or building..."
                    className="pl-12 pr-4 h-12 text-base bg-secondary/50 border-border/50 focus:border-primary focus:ring-primary/20 rounded-xl"
                  />
                  {query && (
                    <button
                      onClick={() => setQuery("")}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                    >
                      <X size={18} />
                    </button>
                  )}
                </div>
                <Button
                  onClick={doLookup}
                  disabled={loadingResults || !query.trim()}
                  className="h-12 px-8 rounded-xl font-medium text-base gap-2"
                >
                  {loadingResults ? (
                    <>
                      <Loader2 size={18} className="animate-spin" />
                      Searching...
                    </>
                  ) : (
                    <>
                      <Search size={18} />
                      Search
                    </>
                  )}
                </Button>
              </div>

              {error && (
                <div className="mb-4 p-3 rounded-lg bg-destructive/10 border border-destructive/20 text-destructive text-sm">
                  {error}
                </div>
              )}

              {/* Suggestions */}
              {(suggestions.length > 0 || loadingSuggest) && (
                <div className="border border-border/50 rounded-xl overflow-hidden">
                  <div className="px-4 py-2 bg-secondary/30 border-b border-border/50">
                    <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                      Suggestions
                    </span>
                  </div>
                  <div className="max-h-64 overflow-y-auto">
                    {loadingSuggest ? (
                      <div className="p-4 space-y-3">
                        {[1, 2, 3].map((i) => (
                          <div key={i} className="flex items-center gap-3">
                            <Skeleton className="w-10 h-10 rounded-lg" />
                            <div className="flex-1 space-y-2">
                              <Skeleton className="h-4 w-3/4" />
                              <Skeleton className="h-3 w-1/2" />
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="p-3 grid gap-2">{suggestions.map(renderSuggestion)}</div>
                    )}
                  </div>
                </div>
              )}

              <div className="mt-4 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className={`w-2 h-2 rounded-full ${isPostcodeOnly ? "bg-primary" : "bg-muted-foreground"}`} />
                  <span className="text-xs text-muted-foreground">
                    {isPostcodeOnly
                      ? "Postcode detected - direct lookup available"
                      : "Text search mode - type to see suggestions"}
                  </span>
                </div>
                <div className="hidden sm:flex items-center gap-1.5 text-xs text-muted-foreground">
                  <Globe size={12} />
                  <span>UK addresses only</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Map Section */}
        {mapAddress && (
          <section className="mb-8">
            <Card className="bg-card border-border/50 overflow-hidden shadow-xl shadow-black/5">
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-primary/10">
                      <Map size={20} className="text-primary" />
                    </div>
                    <div>
                      <CardTitle className="text-lg">Location Map</CardTitle>
                      <p className="text-sm text-muted-foreground truncate max-w-md">{mapAddress}</p>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setMapAddress("")}
                    className="text-muted-foreground hover:text-foreground"
                  >
                    <X size={20} />
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="p-0">
                <div className="w-full h-80 lg:h-96">
                  <iframe
                    title="map"
                    src={`https://www.google.com/maps?q=${encodeURIComponent(mapAddress)}&output=embed`}
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                </div>
              </CardContent>
            </Card>
          </section>
        )}

        {/* Results Section */}
        {(results.length > 0 || loadingResults) && (
          <section>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-foreground">
                {loadingResults ? "Searching..." : `${results.length} Result${results.length !== 1 ? "s" : ""} Found`}
              </h2>
            </div>

            {loadingResults ? (
              <div className="grid gap-4 md:grid-cols-2">
                {[1, 2].map((i) => (
                  <Card key={i} className="bg-card border-border/50">
                    <CardContent className="p-5">
                      <div className="flex items-start gap-4">
                        <Skeleton className="w-12 h-12 rounded-xl" />
                        <div className="flex-1 space-y-3">
                          <Skeleton className="h-5 w-3/4" />
                          <Skeleton className="h-4 w-1/2" />
                          <Skeleton className="h-4 w-2/3" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="grid gap-4 md:grid-cols-2">{results.map(renderResult)}</div>
            )}
          </section>
        )}

        {/* Empty State */}
        {!loadingResults && results.length === 0 && !suggestions.length && !loadingSuggest && (
          <section className="text-center py-12">
            <div className="flex items-center justify-center w-16 h-16 rounded-2xl bg-secondary/50 mx-auto mb-5">
              <Search size={28} className="text-muted-foreground" />
            </div>
            <h3 className="text-lg font-medium text-foreground mb-2">Ready to Search</h3>
            <p className="text-muted-foreground text-sm max-w-md mx-auto mb-6">
              Enter a UK postcode, street name, or building name in the search box above to find addresses.
            </p>
            <div className="flex flex-wrap justify-center gap-2">
              {["SW1A 1AA", "10 Downing Street", "Buckingham Palace"].map((example) => (
                <button
                  key={example}
                  onClick={() => setQuery(example)}
                  className="px-3 py-1.5 text-xs font-medium rounded-full bg-secondary hover:bg-secondary/80 text-foreground transition-colors"
                >
                  Try "{example}"
                </button>
              ))}
            </div>
          </section>
        )}
      </main>
    </div>
  )
}

export default PostcodeFinder
