import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
	content: string;
};

export const readContent = (_: NextApiRequest, res: NextApiResponse<Data>) => {
	res.status(200).json({ content: "Hello world" });
};
