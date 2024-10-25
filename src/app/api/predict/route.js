import path from 'path';
import fs from 'fs';
import csv from 'csv-parser';

export async function POST(req) {
  try {
    const body = await req.json();
    const { rank, seatType, gender, collegeType, domicile } = body;

    if (!rank || !seatType || !gender || !collegeType || !domicile) {
      return new Response(JSON.stringify({ error: 'All fields are required' }), {
        status: 400,
      });
    }

    const rankInt = parseInt(rank);
    const csvFilePath = path.join(process.cwd(), 'public', 'orcrdata.csv');
    const collegeData = [];

    const stream = fs.createReadStream(csvFilePath).pipe(csv());

    await new Promise((resolve, reject) => {
      stream.on('data', (row) => {
        const cleanedRow = {};
        for (const key in row) {
          const cleanedKey = key.trim().replace(/^"|"$/g, '');
          const cleanedValue = row[key].trim().replace(/^"|"$/g, '');
          cleanedRow[cleanedKey] = cleanedValue;
        }

        const openingRank = parseInt(cleanedRow['Opening Rank']);
        const closingRank = parseInt(cleanedRow['Closing Rank']);

        if (!isNaN(openingRank) && !isNaN(closingRank)) {
          collegeData.push({
            ...cleanedRow,
            'Opening Rank': openingRank,
            'Closing Rank': closingRank,
          });
        }
      });
      stream.on('end', resolve);
      stream.on('error', reject);
    });

    const eligibleColleges = collegeData.filter((college) => {
      const openingRank = college['Opening Rank'];
      const closingRank = college['Closing Rank'];
      return (
        rankInt >= openingRank &&
        rankInt <= closingRank &&
        college['Gender'] === gender &&
        college['Seat Type'] === seatType &&
        (collegeType === 'all' || college['Institute Type'] === collegeType)
      );
    });

    return new Response(
      
      JSON.stringify({ eligibleColleges }),
      {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ error: 'Error processing request' }),
      {
        status: 500,
      }
    );
  }
}
