const Expense=require("../models/Expense"); 
const getCategoryChart=async(req,res)=>{
    try{
        const expenses=await Expense.find();
        const categoryMap={};
        expenses.forEach(expense=>{
            const category=expense.category || "others";
        categoryMap[category] =
        (categoryMap[category] || 0) +
        Number(expense.amount);
            
        });
        const chartData=Object.keys(categoryMap).map(category=>({
            category,
            amount: categoryMap[category]
        }));
        res.json(chartData);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
module.exports={
    getCategoryChart
};