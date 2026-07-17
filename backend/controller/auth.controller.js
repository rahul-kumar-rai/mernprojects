export const apiTesting = async (req, res)=>{
    try {
        res.json({message: "api working fine"})
        
    } catch (error) {
        console.log("error api:", error);
        return res.status(500).json({"error api":error});
    }
}