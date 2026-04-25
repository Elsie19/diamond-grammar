vim.filetype.add({ extension = { diamond = "di" } })

vim.api.nvim_create_autocmd("FileType", {
	pattern = "di",
	callback = function(event)
		vim.bo[event.buf].commentstring = "# %s"
	end,
})
