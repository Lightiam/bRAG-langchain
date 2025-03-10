import os
import json
import glob

def update_notebook(notebook_path):
    """Update notebook content to replace bRAG/bRAGAI references with XyLo.Dev"""
    print(f"Processing {notebook_path}...")
    
    # Read the notebook
    with open(notebook_path, 'r', encoding='utf-8') as f:
        notebook = json.load(f)
    
    # Track if changes were made
    changes_made = False
    
    # Process each cell
    for cell in notebook['cells']:
        if cell['cell_type'] == 'markdown':
            for i, source in enumerate(cell['source']):
                # Replace bRAG references with XyLo.Dev
                new_source = source.replace('bRAG', 'XyLo.Dev').replace('bRAGAI', 'XyLo.Dev').replace('bragai', 'xylodev')
                if new_source != source:
                    cell['source'][i] = new_source
                    changes_made = True
        
        elif cell['cell_type'] == 'code':
            for i, source in enumerate(cell['source']):
                # Only replace branding references in comments and strings, not in paths
                if '# ' in source or '"' in source or "'" in source:
                    # Don't replace in file paths
                    if not ('/bRAG' in source or '/bRAGAI' in source):
                        new_source = source.replace('bRAG', 'XyLo.Dev').replace('bRAGAI', 'XyLo.Dev').replace('bragai', 'xylodev')
                        if new_source != source:
                            cell['source'][i] = new_source
                            changes_made = True
    
    # Write the updated notebook if changes were made
    if changes_made:
        with open(notebook_path, 'w', encoding='utf-8') as f:
            json.dump(notebook, f, indent=1)
        print(f"Updated {notebook_path}")
    else:
        print(f"No changes needed in {notebook_path}")

def main():
    """Update all notebooks in the repository"""
    # Find all notebooks
    notebooks = glob.glob('**/*.ipynb', recursive=True)
    
    for notebook in notebooks:
        update_notebook(notebook)
    
    print("Notebook update complete!")

if __name__ == "__main__":
    main()
