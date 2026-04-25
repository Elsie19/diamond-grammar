local parser_config = require("nvim-treesitter.parsers").get_parser_configs()
parser_config.diamond = {
    install_info = {
        url = "https://github.com/Elsie19/diamond-grammar",
        files = { "src/parser.c" },
        generate_reqires_npm = false,
        requires_generate_from_grammar = false,
    },
    -- The filetype you want it registered as
    filetype = "di",
}

vim.filetype.add({ extension = { diamond = "di" } })

vim.api.nvim_create_autocmd("FileType", {
    pattern = "di",
    callback = function(event)
        vim.bo[event.buf].commentstring = "# %s"
    end,
})
