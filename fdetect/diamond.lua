vim.api.nvim_create_autocmd({ "BufRead", "BufNewFile" }, {
    pattern = "*.di",
    callback = function()
        vim.opt.filetype = "diamond"
    end
})
