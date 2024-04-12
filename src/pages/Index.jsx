import React, { useState } from "react";
import { Box, Heading, Input, Button, Stack, Table, Thead, Tbody, Tr, Th, Td, FormControl, FormLabel, Select, Spinner } from "@chakra-ui/react";
import { FaSearch } from "react-icons/fa";

const Index = () => {
  const [ticker, setTicker] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [interval, setInterval] = useState("1d");
  const [stockData, setStockData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchStockData = async () => {
    setLoading(true);
    try {
      const response = await fetch(`/api/stock?ticker=${ticker}&start=${startDate}&end=${endDate}&interval=${interval}`);
      const data = await response.json();
      setStockData(data);
    } catch (err) {
      console.error("Error fetching stock data:", err);
      setError("Failed to fetch stock data. Please try again.");
    }
    setLoading(false);
  };

  if (loading) {
    return (
      <Box textAlign="center" marginTop="8">
        <Spinner size="xl" />
      </Box>
    );
  }

  return (
    <Box maxWidth="800px" margin="auto" padding="4">
      <Heading as="h1" size="xl" textAlign="center" marginBottom="8">
        Stock Search
      </Heading>
      <Stack spacing="4">
        <FormControl>
          <FormLabel>Ticker Symbol</FormLabel>
          <Input value={ticker} onChange={(e) => setTicker(e.target.value)} placeholder="Enter ticker symbol (e.g., AAPL)" />
        </FormControl>
        <FormControl>
          <FormLabel>Start Date</FormLabel>
          <Input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
        </FormControl>
        <FormControl>
          <FormLabel>End Date</FormLabel>
          <Input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
        </FormControl>
        <FormControl>
          <FormLabel>Interval</FormLabel>
          <Select value={interval} onChange={(e) => setInterval(e.target.value)}>
            <option value="1d">Daily</option>
            <option value="1wk">Weekly</option>
            <option value="1mo">Monthly</option>
          </Select>
        </FormControl>
        <Button leftIcon={<FaSearch />} colorScheme="blue" onClick={fetchStockData} isLoading={loading}>
          Search
        </Button>
      </Stack>
      {stockData ? (
        <Box marginTop="8">
          <Heading as="h2" size="lg" marginBottom="4">
            {ticker.toUpperCase()} Stock Data
          </Heading>
          <Table variant="simple">
            <Thead>
              <Tr>
                <Th>Date</Th>
                <Th>Open</Th>
                <Th>High</Th>
                <Th>Low</Th>
                <Th>Close</Th>
                <Th>Volume</Th>
              </Tr>
            </Thead>
            <Tbody>
              {stockData.map((data) => (
                <Tr key={data.Date}>
                  <Td>{data.Date}</Td>
                  <Td>{data.Open}</Td>
                  <Td>{data.High}</Td>
                  <Td>{data.Low}</Td>
                  <Td>{data.Close}</Td>
                  <Td>{data.Volume}</Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </Box>
      ) : error ? (
        <Box textAlign="center" marginTop="8" color="red.500">
          {error}
        </Box>
      ) : null}
    </Box>
  );
};

export default Index;
